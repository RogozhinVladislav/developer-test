<template>
  <a :href="joke.url" target="_blank" class="joke-item">
    <img 
      class="joke-item__image" 
      width="40" 
      height="40" 
      :src="joke.icon" 
      alt="Chuck icon" 
    />
    <p class="joke-item__text">{{ joke.value }}</p>
    <div class="joke-item__update-date">
      Update at: {{joke.updatedAt | formatUpdateDate }}
    </div>
  </a>
</template>

<script>
export default {
  name: 'JokeItem',
  props: {
    joke: {
      type: Object,
      required: true
    }
  },
  filters: {
    formatUpdateDate(value) {
      const date = new Date(value)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      const hours = date.getHours()
      const minutes = '0' + date.getMinutes()
      const formattedTime = `${('0' + day).slice(-2)}.${('0' + month)
        .slice(-2)}.${year} ${hours}:${minutes.substr(-2)}`
      return formattedTime
    }
  }
}
</script>
<style lang="scss">
.joke-item {
  display: block;
  color: #000;
  text-decoration: none;
  text-align: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d0d0d0;
  }

  &__text {
    font-size: 18px;
    font-weight: 600;
    margin: 10px 0;
  }
}
</style>
