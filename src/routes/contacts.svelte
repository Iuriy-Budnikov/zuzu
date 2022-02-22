<script context="module">
  export const prerender = true;
</script>

<script>
  import ImageLoader from '$lib/elements/Image/ImageLoader.svelte';
  import SocialContacts from '$lib/components/SocialContacts/SocialContacts.svelte';
  const imagePath = '/images/emoji/';
</script>

<svelte:head>
  <title>ZuZu Travel | Контакты. Я в соц сетях 😍</title>
  <meta name="description" content="ZuZu Travel | Контакты. Я в соц сетях" />
</svelte:head>

<div class="contacts">
  <div class="contacts__wrapper">
    <div class="contacts__hello">
      <div class="contacts__avatar">
        <ImageLoader
          alt="Ирма Романенко"
          height={200}
          sourceSrcSet={`${imagePath}emoji.webp, ${imagePath}emoji@2x.webp 2x`}
          src={`${imagePath}emoji.jpg`}
          srcset={`${imagePath}emoji.jpg, ${imagePath}emoji@2x.jpg 2x`}
          width={200}
        />
      </div>
      <h1 class="contacts__h1">Привет!<br />Я - Ирма!</h1>
      <h3 class="contacts__h2">По вопросам пишите мне в соц сети, буду рада помочь</h3>
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
