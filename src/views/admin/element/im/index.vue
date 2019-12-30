<template>
  <div class="im-container">
    <transition name="slide">
      <div v-if="!state" key="avatar" class="mini-window" @click="state = true"></div>
      <!-- </transition> -->
      <!-- <transition name="slide-fade"> -->
      <div v-else key="window" class="im-window">
        <div class="header">
          <div class="avatar">
            <img src="@/assets/img/Avatar1.jpeg" />
          </div>
          <div class="customer-service">
            <div class="name">一击男</div>
            <div class="status">客服在线</div>
            <div class="message-group">
              <div class="email">
                <a-icon type="mail" />
              </div>
              <div class="qq">
                <a-icon type="qq" />
              </div>
            </div>
          </div>
          <div class="close" @click="state = false">
            <a-icon type="close" />
          </div>
        </div>
        <div class="content">
          <MessageBoard />
        </div>
        <div class="handler-box">
          <div class="handler">
            <div class="input">
              <auto-size-textarea />
            </div>
            <div class="extend">
              <a-icon type="smile" />
              <a-icon type="plus-circle" />
            </div>
          </div>
        </div>

        <div class="tips">
          we run on
          <a-icon type="message" class="icon-message" />star-im
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AutoSizeTextarea from './auto-size-textarea'
import MessageBoard from './message-board'
export default {
  data () {
    return {
      state: false,
    }
  },
  components: { AutoSizeTextarea, MessageBoard },

  methods: {

  },

}
</script>
<style lang="scss" scoped>
.im-container {
  width: 100%;
  height: 100%;
  .slide-enter-active {
    transition: all 0.3s ease;
  }
  .slide-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
  .mini-window {
    position: fixed;
    bottom: 104px;
    right: 64px;
    width: 60px;
    height: 60px;
    background: rgb(202, 199, 199);
    border-radius: 50%;
    box-shadow: 0 0 6px 0 #999;
    background-image: url("../../../../assets/img/Avatar1.jpeg");
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  .im-window {
    display: grid;
    grid-template-rows: 100px 408px 57px 34px;
    width: 400px;
    height: 600px;
    position: fixed;
    bottom: 104px;
    right: 64px;
    background: rgb(202, 199, 199);
    .header {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(125deg, #e1ae00 -10%, #a37e00 100%);
      // background-size: 100%;
      // background-position: center;
      // background-repeat: no-repeat;
      display: grid;
      grid-template-columns: 60px 1fr 34px;
      .close {
        width: 21px;
        height: 21px;
        margin-top: 10px;
        color: #fff;
        font-size: 12px;
        padding: 0 4px;
        border-radius: 4px;

        &:hover {
          background: #a37e00;
        }
      }
      .avatar {
        padding-left: 20px;
        padding-top: 10px;
      }
      .avatar > img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .customer-service {
        padding-left: 10px;
        padding-top: 10px;
        .name {
          font-size: 14px;
          color: #fff;
        }
        .status {
          font-size: 12px;
          color: #fff;
        }
      }
      .message-group {
        display: flex;
        margin-top: 10px;
        div {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #a37e00;
          margin-right: 6px;
          text-align: center;
          line-height: 30px;
          color: #fff;
        }
      }
    }
    .content {
      width: 100%;
      height: 408px;
      background: #f9f9f9;
      overflow-y: auto;
      position: relative;
      display: grid;
      align-items: flex-end;
      // &::-webkit-scrollbar {
      //   display: none;
      // }
    }
    .handler-box {
      position: relative;
      width: 100%;
      height: 100%;
      .handler {
        width: 100%;
        min-height: 57px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #fff;
        border-top: 1px solid rgba(163, 126, 0, 0.175);
        display: grid;
        grid-template-columns: 1fr 100px;
        justify-items: center;
        font-size: 18px;
        // padding: 10px 20px;
        color: #a37e00;
        .input {
          padding: 10px 10px;
          display: flex;
          align-items: center;
        }
        .extend {
          font-size: 36px;
        }
      }
    }

    .tips {
      width: 100%;
      height: 100%;
      background: #fff;
      border-top: 1px solid rgba(163, 126, 0, 0.175);
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-message {
        margin: 0 4px;
      }
    }
  }
}
</style>