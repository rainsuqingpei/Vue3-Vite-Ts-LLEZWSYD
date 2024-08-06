// import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';

// const { VITE_TOKEN_KEY } = import.meta.env;
// const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreFormal {
  env: string;
  areaCode: string;
  fwzCode: string;
  mac: string;
  moduleUrl: string;
  moduleCode: string;
  moduleType: string;
}

export const useFormalStore = defineStore({
  id: 'app-formal',
  state: (): StoreFormal => ({
    env: '/formalHomes',
    areaCode: '2100',
    fwzCode: '',
    mac: '',
    moduleUrl: '',
    moduleCode: '',
    moduleType: '',
  }),
  getters: {
    getEnv(): string {
      return this.env || '';
    },
    getAreaCode(): string {
      return this.areaCode || '';
    },
    getFwzCode(): string {
      return this.fwzCode || '';
    },
    getMac(): string {
      return this.mac || '';
    },
    getModuleUrl(): string {
      return this.moduleUrl || '';
    },
    getModuleCode(): string {
      return this.moduleCode || '';
    },
    getModuleType(): string {
      return this.moduleType || '';
    },
  },
  actions: {
    setEnv(env: string) {
      this.env = env ? env : '';
    },
    setAreaCode(areaCode: string) {
      this.areaCode = areaCode ? areaCode : '';
    },
    setFwzCode(fwzCode: string) {
      this.fwzCode = fwzCode ? fwzCode : '';
    },
    setMac(mac: string) {
      this.mac = mac ? mac : '';
    },
    setModuleUrl(moduleUrl: string) {
      this.moduleUrl = moduleUrl ? moduleUrl : '';
    },
    setModuleCode(moduleCode: string) {
      this.moduleCode = moduleCode ? moduleCode : '';
    },
    setModuleType(moduleType: string) {
      this.moduleType = moduleType ? moduleType : '';
    },
  },
  persist: {
    key: 'token',
    storage: localStorage,
    paths: ['token'],
  },
});
