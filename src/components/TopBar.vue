<script setup lang="ts">
import { Avatar, Xhs } from './icons'
</script>

<template>
  <div class="topbar-container">
    <div class="topbar-safe-area-container">
      <div class="topbar-left-container">
        <Xhs />
        <span>小花狮阅读教学系统</span>
      </div>
      <div class="topbar-right-container">
        <button class="topbar-language-button">
          简体中文
        </button>
        <div class="topbar-right-container-item">
          <Avatar />
          <span>用户名</span>
          <button class="option">
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1L5.5 6L1 1" stroke="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(90.2deg, #8fa2ff -25.12%, var(--primary-color) 104.2%);

  .topbar-safe-area-container {
    --safe-x-width: 42px;
    width: calc(100%-var(--safe-x-width));
    margin: 0px var(--safe-x-width);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .topbar-left-container {
      display: flex;
      align-items: center;
      gap: 10px;

      span {
        font-family: 'Source Han Sans CN';
        font-style: normal;
        font-weight: 700;
        letter-spacing: 0.05em;
        font-size: 19px;
        color: white;
      }
    }

    .topbar-right-container {
      display: flex;
      align-items: center;
      gap: 50px;

      .topbar-language-button {
        background: white;
        color: var(--primary-color);
      }

      .topbar-right-container-item {
        display: flex;
        align-items: center;
        gap: 10px;

        span {
          font-size: 15px;
          color: white;
          height: 100%;
        }

        .option {
          background: none;
          padding: 2px;
          border-radius: 4px;
          cursor: pointer;
          align-self: stretch;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
