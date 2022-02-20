<script>
  import SocialContact from './SocialContact.svelte';
  import SocialContactsList from './SocialContactsList.svelte';
  import Icon from '../../elements/Icon/Icon.svelte';
</script>

<SocialContactsList>
  <SocialContact link="https://www.facebook.com/zuzutravelua/">
    <Icon name="facebook" />
  </SocialContact>
  <SocialContact link="https://t.me/zuzutravelua">
    <Icon name="telegram" />
  </SocialContact>
  <SocialContact link="https://www.instagram.com/zuzutravel.ua/">
    <Icon name="instagram" />
  </SocialContact>
  <SocialContact link="https://wa.me/+380635513261?lang=ru">
    <Icon name="whatsap" />
  </SocialContact>
</SocialContactsList>
