<template>
    <div class="about_box">
        <div class="user_box">
            <h1>Wen Jiang</h1>
            <h3>神秘IT男</h3>
            <p>更简单、更纯粹</p>
        </div>
        <div class="contact_box">
            <a href="mailto:jzwbuer@163.com">
                <button>
                    <svg class="icon" aria-hidden="true">
                        <use href="#icon-youjian"></use>
                    </svg>
                </button>
            </a>
            <a href="https://www.baidu.com">
                <button>
                    <svg class="icon" aria-hidden="true">
                        <use href="#icon-weixin"></use>
                    </svg>
                </button>
            </a>
            <a href="https://github.com/maohuifei">
                <button>
                    <svg class="icon" aria-hidden="true">
                        <use href="#icon-github"></use>
                    </svg>
                </button>
            </a>
            <a href="https://www.baidu.com">
                <button>
                    <svg class="icon" aria-hidden="true">
                        <use href="#icon-telegram"></use>
                    </svg>
                </button>
            </a>
        </div>
    </div>
</template>

<script lang='ts'>
export default {

    setup() {

    }
}
</script>

<style scoped lang="less">
a,
a:hover {
    background-color: transparent;
}

.icon {
    fill: white;
}

.about_box {
    width: 80%;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: var(--txtColor);
}

.user_box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.portrait {
    width: 100px;
    height: 100px;
}

.contact_box {
    margin-top: 50px;

    button {
        background-color: var(--elementColor);
        border: none;
    }
}
</style>