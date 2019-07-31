<template>
  <li
    :class="{'active-category': category === selectedCategory}"
    class="category"
  >
    <input
      :id="category"
      type="radio"
      :value="category"
      :checked="category === selectedCategory"
      @change="changeCategory(category)"
      class="category-input"
    />
    <label 
      :for="category" 
      class="category-name"
    >
      {{category | capitalize}}
    </label>
  </li>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    category: {
      type: String,
      required: true
    },
    selectedCategory: {
      type: String,
      required: true
    }
  },
  methods: {
    changeCategory(category) {
      this.$emit('changeCategory', category)
    }
  },
  filters: {
    capitalize: value => value.charAt(0).toUpperCase() + value.slice(1)
  }
}
</script>
<style lang="scss">
.category {
  font-size: 18px;
  list-style: none;

  &:hover {
    color: #2196f3;
  }

  &-name {
    display: flex;
    align-items: center;
    height: 30px;
    position: relative;
    padding-left: 18px;
    cursor: pointer;

    &:before {
      content: "";
      display: block;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #8f8f92;
    }
  }

  &-input {
    display: none;

    &:checked + .category-name:before {
      background-image: url("https://assets.chucknorris.host/img/avatar/chuck-norris.png");
      background-position: center;
      background-size: 110%;
      background-repeat: no-repeat;
    }
  }
}
</style>
