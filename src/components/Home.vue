<template>
  <div class="home">
    <n-drawer v-model:show="visibility" width="500" placement="right" :auto-focus="false">
      <n-drawer-content title="KOOK 小助手" class="home__content">
        <n-scrollbar style="">
          <n-space vertical>
            <n-card>
              <template #header>
                <n-h3 prefix="bar" align-text>
                  功能
                </n-h3>
              </template>
              <n-collapse display-directive="show" arrow-placement="right">
                <n-collapse-item title="字体" name="1">
                  <Font/>
                </n-collapse-item>
                <n-collapse-item title="头像" name="2">
                  <Avatar/>
                </n-collapse-item>
                <n-collapse-item title="去污粉" name="3">
                  <Concise/>
                </n-collapse-item>
                <n-divider/>
                <UserListBlur/>
                <n-divider/>
                <SimpleTextChannel/>
              </n-collapse>
              <template #action>
                来自服务器内小伙伴们的奇思妙想。
              </template>
            </n-card>
            <n-card>
              <template #header>
                <n-h3 prefix="bar" align-text>
                  优化
                </n-h3>
              </template>
              <Intro/>
              <n-divider/>
              <RoleListContrast/>
              <n-divider/>
              <PinChannel/>
              <n-divider/>
              <n-collapse display-directive="show" arrow-placement="right">
                <n-collapse-item title="过渡动画" name="1">
                  <Transitions/>
                </n-collapse-item>
              </n-collapse>
              <template #action>
                有时候你这认为的 bug 其实是 feature。
              </template>
            </n-card>
            <n-card>
              <template #header>
                <n-h3 prefix="bar" type="error" align-text>
                  高级
                </n-h3>
              </template>
              <n-collapse display-directive="show" arrow-placement="right">
                <n-collapse-item title="自定义样式" name="1">
                  <CustomCSS/>
                </n-collapse-item>
              </n-collapse>
              <n-divider/>
              <template #action>
                你最好知道你在干什么。
              </template>
            </n-card>
          </n-space>
        </n-scrollbar>
        <template #footer>
          by: eki1563 | {{ version }}
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { NDrawer, NDrawerContent, NScrollbar, NSpace, NCard, NCollapse, NCollapseItem, NDivider, NH3 } from 'naive-ui'
import Font from '@/components/features/Font.vue'
import Avatar from '@/components/features/Avatar.vue'
import Intro from '@/components/optimizations/Intro.vue'
import Transitions from '@/components/optimizations/Transitions.vue'
import Concise from '@/components/features/Concise.vue'
import pkg from '/package.json'
import UserListBlur from '@/components/features/UserListBlur.vue'
import RoleListContrast from '@/components/optimizations/RoleListContrast.vue'
import SimpleTextChannel from '@/components/features/SimpleTextChannel.vue'
import PinChannel from '@/components/optimizations/PinChannel.vue'
import CustomCSS from '@/components/features/CustomCSS.vue'
// import PanGu from '@/components/features/Pangu.vue'

const visibility = ref(false)
const version = `v${ pkg.version }`

defineExpose({
  show() {
    visibility.value = true
  },
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
})
</script>

<style lang="less" scoped>
.home__content {
  background-color: var(--color-middle-bg);
  :deep(.n-drawer-body-content-wrapper) {
    padding: 10px;
  }
  :deep(.n-collapse-item__header-main) {
    justify-content: space-between;
  }
}
</style>

