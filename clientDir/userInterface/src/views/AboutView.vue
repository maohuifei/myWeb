<template>
    <div class="about_box">
        <div class="user_box">
            <img class="portrait" src="/portrait.jpg" />
            <h1>HuaFeng</h1>
            <h3>神秘IT男</h3>
            <p>更简单、更纯粹</p>
        </div>
        <div class="contact_box">
            <el-button type="success" icon="ChatRound" circle />
            <el-button type="primary" icon="Message" circle />
            <el-button type="info" icon="Close" circle />
            <el-button type="primary" icon="Position" circle />
        </div>
        <!-- <div class="project_box">
            <h2>我的项目</h2>
        </div> -->

    </div>
</template>

<script lang='ts'>

export default {
    setup() {
        return {
        }
    }
}
</script>

<style scoped>
.about_box {
    width: 80%;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: var(--textColor);
}
.user_box{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.portrait {
    width: 100px;
    height: 100px;
}
.contact_box{
    margin-top: 50px;
}
</style>