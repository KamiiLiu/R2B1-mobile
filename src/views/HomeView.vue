<template lang="pug">
div
  div(v-if="items.length === 0")
    p 陣列為空的畫面
  div(v-else)
    p 陣列有資料的畫面
    //-p {{ items }}
    div(v-for='pair in items' :key="pair.pair")
      div(v-for='(person,index) in pair.roles' :key="index")
        p {{ person.label }}
</template>
  
<script lang="ts">
import { defineComponent, Ref,ref, onMounted, onUnmounted } from 'vue'
import dayjs from '@/utils/dayjs';
import { getDatabase, ref as firebaseRef, onValue, DataSnapshot } from "firebase/database";
import firebaseApp from '@/firebase/firebaseConfig';
import Role from "@/interfaces/RoleInterface";
import GroupedRoles from "@/interfaces/GroupedRolesInterface";
export default defineComponent({
  name: 'GameSetting',
  components: {
  },
  setup() {
    const items: Ref<Role[]> = ref([]);
    const date = dayjs.tz(new Date()).format('YYYY-MM-DD')
    const database = getDatabase(firebaseApp);
    const listRef = firebaseRef(database, date);
    let unsubscribe: () => void;
    onMounted(() => {
      unsubscribe = onValue(listRef, (snapshot: DataSnapshot) => {
        const data:GroupedRoles[] = snapshot.val();
        console.log(snapshot.val())
        if (data) {
          console.log(Object.values(data)[0].roles);
          items.value = Object.values(data)[0].roles;
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

