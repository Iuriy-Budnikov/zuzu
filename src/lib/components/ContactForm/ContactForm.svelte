<script>
  import { createForm } from 'svelte-forms-lib';
  import jsonp from 'jsonp';
  import toQueryString from 'to-querystring';
  import Button from '$lib/elements/Button/Button.svelte';
  import Form from '$lib/elements/Forms/Form.svelte';
  import FormTextField from '$lib/elements/Forms/FormTextField.svelte';
  import FormSelect from '$lib/elements/Forms/FormSelect.svelte';
  import FormTextArea from '$lib/elements/Forms/FormTextArea.svelte';
  import FormError from '$lib/elements/Forms/FormError.svelte';
  import schema from './schema';
  import { dispatchEvent } from '$lib/utils/gaUtils';
  import Section from '$lib/elements/Section/Section.svelte';

  const mailchimpUrl =
    'https://wearepush.us20.list-manage.com/subscribe/post-json?u=a48775420ec3b698e2d21afbc&amp;id=a16d900261';

  let error = '';
  let isSubmitted = false;

  const submit = async ({ url }) => {
    return new Promise((resolve, reject) => {
      jsonp(
        url,
        {
          param: 'c'
        },
        (err, data) => {
          if (err) {
            reject({ message: err });
          } else if (data.result !== 'success') {
            reject({ message: data.msg });
          } else {
            resolve({});
          }
        }
      );
    });
  };

  const onSubmit = async (values) => {
    error = '';
    const value = {
      EMAIL: values?.email,
      NAME: values?.name,
      MESSAGE: values?.message,
      PHONE: values?.phone,
      DEPARTMENT: values?.department?.value
    };
    const params = toQueryString(value);
    const url = mailchimpUrl + '&' + params;
    try {
      await submit({ url });
      error = '';
      isSubmitted = true;
      formContext.handleReset();
      dispatchEvent('submit', {
        section: 'contant-form'
      });
    } catch (err) {
      error = err.message;
    }
  };

  let formContext = createForm({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      department: {
        value: 'Development',
        label: 'Development'
      },
      message: ''
    },
    validationSchema: schema,
    onSubmit
  });
  const departments = [
    { value: 'Development', label: 'Development' },
    { value: 'Design', label: 'Design' }
  ];
  const { isSubmitting } = formContext;
</script>

<Section id="contact-form" isContactForm={true}>
  <div class="contact-form__title">
    <h2>Wazup there</h2>
    <h3>We’re here for you, drop us a line</h3>
  </div>
  {#if isSubmitted}
    <div class="contact-form__message">
      <p>Thank you so much.</p>
      <p>We appreciate you reaching out and will get back to you soon.</p>
    </div>
  {:else}
    <Form context={formContext}>
      <div class="contact-form__container">
        <div class="contact-form__item">
          <FormTextField disabled={$isSubmitting} label="Name*" name="name" />
        </div>
        <div class="contact-form__item">
          <FormSelect
            disabled={$isSubmitting}
            label="Department"
            name="department"
            options={departments}
            isClearable={false}
            isSearchable={false}
          />
        </div>
        <div class="contact-form__item">
          <FormTextField
            disabled={$isSubmitting}
            label="Contact email*"
            type="email"
            name="email"
          />
        </div>
        <div class="contact-form__item">
          <FormTextField disabled={$isSubmitting} label="Phone number" name="phone" />
        </div>
        <div class="contact-form__item">
          <FormTextArea
            disabled={$isSubmitting}
            label="Go ahead. We're all ears.*"
            name="message"
          />
        </div>
      </div>
      <div class="contact-form__button">
        <Button disabled={$isSubmitting} type="submit">Send Message</Button>
      </div>
    </Form>
    <FormError {error} />
  {/if}
</Section>

<style lang="scss">
  .contact-form {
    &__message {
      display: block;
    }
    &__button{
      padding-top: 19px;
    }
    &__title {
      padding-bottom: 89px;
      @include media('<=phone') {
        padding-bottom: 40px;
      }
      h3,
      h2 {
        font-size: 44px;
        line-height: 51px;

        @include media('<=phone') {
          font-size: 34px;
          line-height: 40px;
        }
      }
      h2 {
        font-weight: 300;
      }
    }
    &__container {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -20px;

      @include media('<=phone') {
        margin: 0;
        flex-direction: column;
      }
    }
    &__item {
      width: 50%;
      padding: 0 20px;
      margin-bottom: 50px;

      @include media('<=phone') {
        padding: 0;
        width: 100%;
        margin-bottom: 24px;
        max-width: 547px;
      }
    }
  }
</style>
