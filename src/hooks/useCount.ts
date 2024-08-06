import { computed, ref, Ref } from "vue"
// 定义hook方法
type CountResultProps = {
  count: Ref<number>;
  multiple: Ref<number>; // 计算属性
  increase: (delta?: number) => void;
  decrease: (delta?: number) => void;
}

export default function useCount(initValue = 1): CountResultProps {
  const count = ref(initValue)

  const multiple = computed(
    () => count.value * 2
  )

  const increase = (delta?: number): void => {
    if (typeof delta !== 'undefined') {
      count.value += delta
    } else {
      count.value += 1
    }
  }

  const decrease = (delta?: number): void => {
    if (typeof delta !== "undefined") {
      count.value -= delta
    } else {
      count.value -= 1
    }
  }
  return {
    count,
    increase,
    decrease,
    multiple
  }
}