<template>
    <div class="about_box">
        <h1>关于我</h1>
        <div class="content_section">
            <h2>个人介绍</h2>
            <p>你好，我是wen Jiang，一个神秘IT男</p>
        </div>

        <div class="content_section">
            <h2>技术栈</h2>
            <p>最常使用JavaScript技术栈</p>
            <div class="tech_list">
                <div class="tech_category">
                    <h3>WEB开发</h3>
                    <ul>
                        <li>JavaScript/ES6+</li>
                        <li>TypeScript</li>
                        <li>Vue3</li>
                        <li>Node.js</li>
                        <li>Koa</li>
                        <li>MySQL</li>
                        <li>MongoDB</li>
                    </ul>
                </div>
                <div class="tech_category">
                    <h3>操作系统</h3>
                    <ul>
                        <li>Windows</li>
                        <li>MacOS</li>
                        <li>Ubuntu</li>
                        <li>CentOS</li>
                        <li>Deepin</li>
                        <li>RedHat</li>
                        <li>中标麒麟</li>
                    </ul>
                </div>
                <div class="tech_category">
                    <h3>视觉设计</h3>
                    <ul>
                        <li>Photoshop</li>
                        <li>Illustrator</li>
                        <li>LOGO</li>
                        <li>插画</li>
                        <li>包装</li>
                        <li>UI/UX</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="content_section">
            <h2>联系方式</h2>
            <div class="contact_list">
                <a href="mailto:example@email.com" class="contact_item">
                    <svg class="icon" aria-hidden="true">
                        <use href="#icon-youjian"></use>
                    </svg>
                    <span>Email</span>
                </a>
                <a href="https://github.com/yourusername" target="_blank" class="contact_item">
                    <svg class="icon" aria-hidden="true">
                        <use href="#icon-github"></use>
                    </svg>
                    <span>GitHub</span>
                </a>
                <div class="contact_item qrcode-container">
                    <svg class="icon" aria-hidden="true">
                        <use href="#icon-weixin"></use>
                    </svg>
                    <span>WeChat</span>
                    <div class="qrcode">
                        <img src="/weixin.jpg" alt="WeChat QR Code">
                    </div>
                </div>
                <div class="contact_item qrcode-container">
                    <svg class="icon" aria-hidden="true">
                        <use href="#icon-telegram"></use>
                    </svg>
                    <span>Telegram</span>
                    <div class="qrcode">
                        <img src="/telegram.jpg" alt="Telegram QR Code">
                    </div>
                </div>
            </div>
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
.about_box {
    max-width: 900px;
    margin: 0 auto;
    padding: 80px 20px 40px;

    h1 {
        font-size: 2.8em;
        color: var(--systemColor);
        text-align: center;
        margin-bottom: 60px;
        position: relative;
        font-weight: 600;

        &::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 140px;
            height: 4px;
            background: var(--systemColor);
            border-radius: 2px;
        }
    }

    .content_section {
        margin: 50px 0;
        padding: 35px;
        background: white;
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        transition: all 0.4s ease;

        &:hover {
            transform: translateY(-8px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        h2 {
            font-size: 2em;
            color: var(--systemColor);
            margin-bottom: 25px;
            text-align: left;
            font-weight: 600;
            position: relative;
            padding-left: 20px;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 6px;
                height: 28px;
                background: var(--systemColor);
                border-radius: 3px;
            }
        }

        p {
            font-size: 1.15em;
            line-height: 1.8;
            color: #2c3e50;
            text-align: justify;
            letter-spacing: 0.6px;
            margin: 0 20px 20px;
        }

        .tech_list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin: 30px 20px;

            .tech_category {
                h3 {
                    font-size: 1.4em;
                    color: var(--systemColor);
                    margin-bottom: 15px;
                    font-weight: 500;
                }

                ul {
                    list-style: none;
                    padding: 0;

                    li {
                        font-size: 1.1em;
                        color: #2c3e50;
                        margin: 12px 0;
                        padding-left: 25px;
                        position: relative;

                        &::before {
                            content: '•';
                            position: absolute;
                            left: 0;
                            color: var(--systemColor);
                            font-size: 1.5em;
                            line-height: 1;
                        }
                    }
                }
            }
        }

        .contact_list {
            display: flex;
            justify-content: center;
            gap: 40px;
            margin-top: 35px;
            flex-wrap: wrap;

            .contact_item {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px 30px;
                border: 2.5px solid var(--systemColor);
                border-radius: 12px;
                text-decoration: none;
                color: var(--systemColor);
                transition: all 0.4s ease;
                background: transparent;
                position: relative;
                overflow: visible;
                cursor: pointer;

                &.qrcode-container {
                    .qrcode {
                        position: absolute;
                        bottom: calc(100% + 15px);
                        left: 50%;
                        transform: translateX(-50%) scale(0);
                        background: white;
                        padding: 10px;
                        border-radius: 8px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.15);
                        transition: all 0.3s ease;
                        opacity: 0;
                        z-index: 100;
                        pointer-events: none;

                        img {
                            width: 150px;
                            height: 150px;
                            display: block;
                        }

                        &::after {
                            content: '';
                            position: absolute;
                            top: 100%;
                            left: 50%;
                            transform: translateX(-50%);
                            border-width: 8px;
                            border-style: solid;
                            border-color: white transparent transparent transparent;
                        }
                    }

                    &:hover .qrcode {
                        transform: translateX(-50%) scale(1);
                        opacity: 1;
                    }
                }

                .icon {
                    width: 24px;
                    height: 24px;
                    fill: var(--systemColor);
                }

                span {
                    font-size: 1.1em;
                    font-weight: 500;
                }

                &:hover {
                    background: var(--systemColor);
                    color: white;

                    .icon {
                        fill: white;
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .about_box {
        padding: 60px 15px 30px;

        h1 {
            font-size: 2.2em;
        }

        .content_section {
            padding: 25px;
            margin: 30px 0;

            .contact_list {
                gap: 20px;

                .contact_item {
                    padding: 12px 20px;
                }
            }
        }
    }
}
</style>