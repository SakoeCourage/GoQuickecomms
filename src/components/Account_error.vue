<template>
    <div class="md:text-center">
        <h1>{{ account }}</h1>
        <span>is already a local accout</span>
    </div>
</template>

<script>
export default {
    props: { account: String }


}

</script>