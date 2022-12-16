<script>
  import { page } from '$app/stores';
  import ImageLoader from '$lib/elements/Image/ImageLoader.svelte';
  import SocialContacts from '$lib/components/SocialContacts/SocialContacts.svelte';
  const imagePath = '/images/emoji/';

  const title = 'Контакти. Я в соціальних мережах 😍';
  const description = "Для звя'зку будь ласка використовуйте наступні посилання";
  const coverImage = `${$page.url.origin}/images/social_contacts.jpg`;
</script>

<svelte:head>
  <link rel="canonical" href={$page.url.href} />
  <title>{title}</title>
  <meta name="description" content={description} />

  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />
  <meta itemprop="image" content={coverImage} />

  <meta property="og:url" content={$page.url.href} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={coverImage} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content={$page.url.origin} />
  <meta property="twitter:url" content={$page.url.href} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={coverImage} />
</svelte:head>

<div class="contacts">
  <div class="contacts__wrapper">
    <div class="contacts__hello">
      <div class="contacts__avatar">
        <ImageLoader
          alt="Ирма"
          height={200}
          sourceSrcSet={`${imagePath}emoji.webp, ${imagePath}emoji@2x.webp 2x`}
          src={`${imagePath}emoji.jpg`}
          srcset={`${imagePath}emoji.jpg, ${imagePath}emoji@2x.jpg 2x`}
          width={200}
        />
      </div>
      <h1 class="contacts__h1">Привіт!<br />Мене звуть Ірма!</h1>
      <h3 class="contacts__h2">
        Підписуйся в соціальних мережах та будь вкурсі гарячих пропозицій
      </h3>
    </div>
    <SocialContacts />
  </div>
</div>

<style lang="scss">
  .contacts {
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    display: flex;

    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100;
      flex-direction: column;
    }

    &__avatar {
      width: 200px;
      margin: 0 auto 30px auto;
    }

    &__h1,
    &__h2 {
      text-align: center;
    }
    &__h1 {
      margin-bottom: 20px;
    }

    &__hello {
      margin-bottom: 40px;
    }
  }
</style>
