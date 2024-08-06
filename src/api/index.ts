import { http } from '@/utils/request';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return http.post(`/api/login`, {
    data: { name: '123' },
  });
}

export function test1({ areaCode, moduleType, stageState }) {
  return http.post(`/zwzzj/bmModuleInfo/GetCityBusinessTree`, {
    areaCode: areaCode,
    moduleType: moduleType,
    stageState: stageState,
  });
}

export function test2(parmes:any) {
  return http.post(`/zwzzj/bmModuleInfo/searchModuleName`, parmes);
}

export function test3() {
  return http.get(`http://43.243.130.162:81/ems/base/AreaConstruction/findAllList/12/`,);
}

export function test4(parmes:any) {
  return http.post(`/zwzzj/visitorInfo/api/imageCheck`, parmes);
}
