<script>
  import SocialContact from './SocialContact.svelte';
  import SocialContactsList from './SocialContactsList.svelte';
  import MediaQuery from '$lib/elements/MediaQuery/MediaQuery.svelte';
  import Icon from '../../elements/Icon/Icon.svelte';
  const phone = '+380635513261';
</script>

<SocialContactsList>
  <SocialContact className="ga-event-facebook" link="https://www.facebook.com/zuzutravelua/">
    <Icon name="facebook" />
  </SocialContact>
  <SocialContact className="ga-event-telegram" link="https://t.me/zuzutravelua">
    <Icon name="telegram" />
  </SocialContact>
  <SocialContact className="ga-event-instagram" link="https://www.instagram.com/zuzutravel.ua/">
    <Icon name="instagram" />
  </SocialContact>
  <SocialContact className="ga-event-tiktok" link="https://www.tiktok.com/@zuzutravel_ua">
    <Icon name="tiktok" />
  </SocialContact>
  <SocialContact className="ga-event-whatsapp" link="https://wa.me/{phone}?lang=ru">
    <Icon name="whatsapp" />
  </SocialContact>
  <MediaQuery query="(max-width: 1024px)" let:matches>
    {#if matches}
      <SocialContact className="ga-event-viber" link="viber://chat?number={phone}">
        <Icon name="viber" />
      </SocialContact>
    {/if}
  </MediaQuery>
</SocialContactsList>
