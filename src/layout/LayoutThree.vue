<template>
    <div class="container">
        <div class="header"><slot name="top"></slot></div>
        <div class="main">
            <split :gutterSize="10">

                <split-area :size="10" :min-size="50"><slot name="aside"></slot></split-area>
                <split-area></split-area>
            </split>

        </div>
    </div>

</template>

<script>
    export default {
        name: "LayoutThree"
    }
</script>

<style scoped lang="scss">

    .container {
        width: 100%;
        height: 100%;

        .header{
            height: 60px;
            background-color: #eee;
        }
        .main{
            height: calc(100vh - 60px);
        }


    }


</style>
