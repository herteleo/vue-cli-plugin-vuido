<template>
  <Window
    title="Welcome to your Vuido application!"
    width="400"
    height="100"
    margined
    @close="exit"
  >
    <Box>
      <Text>
        Welcome to your Vuido application!
      </Text>
    </Box>
  </Window>
</template>

<script>
export default {
  methods: {
    exit() {
      this.$exit();
    },
  },
};
</script>
