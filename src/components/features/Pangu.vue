<script setup lang="ts">
import { NDivider, NSpace, NSwitch, NA } from 'naive-ui'
import TooltipsHelp from '@/components/TooltipsHelp.vue'
import { ref } from 'vue'
import { useGetPangu, useSetPangu } from '@/composables/features/pangu'

const white = ref(false)
white.value = useGetPangu()

function onWhite(val: boolean) {
  useSetPangu(val)
}


</script>

<template>
  <div class="hover-smooth">
    <n-space align="center" justify="space-between">
      <label style="text-decoration: line-through;">盘古之白
        <TooltipsHelp>
          <template #message>
            还有点问题。
            <!--            <div>为什么你们就是不能加个空格呢？</div>-->
            <!--            <div>-->
            <!--              那我来加！-->
            <!--              <n-a-->
            <!--                href="https://blog.xiaoquankong.ai/zh/posts/chinese-document-typesetting-specification-spacing-of-pangu/"-->
            <!--                target="_blank"-->
            <!--              >-->
            <!--                中文文案排版指南-->
            <!--              </n-a>-->
            <!--            </div>-->
          </template>
        </TooltipsHelp>
      </label>
      <n-switch v-model:value="white" @update:value="onWhite"/>
    </n-space>
    <n-divider/>
  </div>
</template>

<style scoped lang="less">

</style>
