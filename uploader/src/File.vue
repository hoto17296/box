<template>
  <div>
    ({{ date.toDateString() }})
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      required: true,
      type: String,
      validator(value) {
        return value.match(/^[\da-f-]{36}$/i);
      },
    },
    date: {
      required: true,
      type: Date,
    },
  },
}
</script>
