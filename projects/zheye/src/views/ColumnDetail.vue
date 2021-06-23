<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, ColumnProps } from '../store'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from '../helper'
export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    // 为了让 computed 响应对应的变化，添加响应式对象
    const currentId = ref(route.params.id)
    onMounted(() => {
      store.dispatch('fetchColumn', currentId.value)
      store.dispatch('fetchPosts', currentId.value)
    })
    // 检测变化
    watch(() => route.params, (toParams) => {
      // 重新发送请求，在 store 中有对应的缓存设置
      store.dispatch('fetchColumn', toParams.id)
      store.dispatch('fetchPosts', toParams.id)
      // 重新赋值，这样 computed 会变化
      currentId.value = toParams.id
    })
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId.value) as ColumnProps | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => store.getters.getPostsByCid(currentId.value))

    return {
      column,
      list
    }
  }
})
</script>
