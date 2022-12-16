<script>
  import { page } from '$app/stores';

  let title;
  let description;
  let pageTitle;
  let pageDescription;
  $: {
    if ($page.status === 404) {
      title = 'Така сторінка не знайдена - 404';
      description =
        'Сторінка, яку ви намагаєтесь відкрити, не знайдена. Будь ласка, перейдіть на головну.';
      pageTitle = 'Такої сторінки не існує';
      pageDescription = 'Схоже, це неправильна адреса або сторінка переїхала';
    } else if ($page.status === 500) {
      title = 'На сторінці виникла помилка - 500';
      description =
        'На сторінці, яку ви намагаєтесь відкрити, виникла помилка. Будь ласка, поверніться пізніше.';
      pageTitle = 'На сторінці виникла помилка';
      pageDescription = 'Вибачте, сайт тимчасово не працює. Поверніться трохи пізніше';
    } else if ($page.status) {
      title = `На сторінці виникла помилка - ${$page.status}`;
      description =
        'На сторінці, яку ви намагаєтесь відкрити, виникла помилка. Будь ласка, поверніться пізніше.';
      pageTitle = 'На сторінці виникла помилка';
      pageDescription = 'Вибачте, сайт тимчасово не працює. Поверніться трохи пізніше';
    }
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
</svelte:head>

<div class="error">
  <h1>{$page.status}</h1>
  <h2>{pageTitle}</h2>
  <h3>{pageDescription}</h3>
  <a href="/">На головну</a>
</div>

<style lang="scss">
  .error {
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    max-width: 1200px;
    margin: 0 auto;
    padding: 240px 40px 40px 40px;

    @include media('<=tablet') {
      padding: 28px 30px;
      z-index: 5;
    }

    @include media('<=phone') {
      padding: 14px 16px;
    }

    h1 {
      font-weight: bold;
      font-size: 98px;
      line-height: 110%;
      font-family: var(--type__secondary);
      margin: 86px 0 37px;

      @include media('<=phone') {
        margin: 86px 0 41px;
      }
    }

    h2 {
      font-weight: bold;
      font-size: 64px;
      line-height: 110%;
      font-family: var(--type__secondary);
      margin-bottom: 24px;

      @include media('<=phone') {
        font-size: 40px;
      }
    }

    h3 {
      font-weight: 100;
      font-size: 24px;
      line-height: 140%;
      margin-bottom: 80px;

      @include media('<=phone') {
        font-size: 14px;
        line-height: 160%;
      }
    }

    a {
      border-bottom: 0;
    }
  }
</style>
