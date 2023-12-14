<template>
  <div>
    <div v-if="items.length === 0">
      陣列為空的畫面
    </div>
    <div v-else>
      陣列有資料的畫面
      <ul>
        <p>{{ items }}</p>
      </ul>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import dayjs from '@/utils/dayjs';
import { getDatabase, ref as firebaseRef, onValue, DataSnapshot } from "firebase/database";
import firebaseApp from '@/firebase/firebaseConfig';
export default defineComponent({
  name: 'GameSetting',
  components: {
  },
  setup() {
    const items = ref([]);
    const date = dayjs.tz(new Date()).format('YYYY-MM-DD')
    const database = getDatabase(firebaseApp);
    const listRef = firebaseRef(database, date);
    let unsubscribe: () => void;
    onMounted(() => {
      unsubscribe = onValue(listRef, (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        console.log(snapshot.val())
        if (data) {
          items.value = data;
        } else {
          items.value = [];
        }
      });
    });

    onUnmounted(() => {
      if (unsubscribe) {
        unsubscribe();
      }
    });
    return{
      items
    }
  }
})
</script>
<style scoped>
.home {
  width: 100vw;
  height: 100vh;
}
</style>

