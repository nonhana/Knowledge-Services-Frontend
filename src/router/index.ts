import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../pages/home/index.vue"),
  },
  {
    path: "/institutionalMap",
    name: "institutionalMap",
    redirect: "/institutionalMap/index",
    component: () => import("../pages/institutionalMap/index.vue"),
    children: [
      {
        path: "/institutionalMap/index",
        name: "institutionalMapIndex",
        component: () => import("../components/institutionalMap/indexMain.vue"),
      },
      {
        path: "/institutionalMap/nationalMap",
        name: "institutionalMapNationalMap",
        component: () =>
          import("../components/institutionalMap/nationalMapMain.vue"),
      },
      {
        path: "/institutionalMap/govPolicyMap",
        name: "institutionalMapGovPolicyMap",
        component: () =>
          import("../components/institutionalMap/govPolicyMapMain.vue"),
      },
      {
        path: "/institutionalMap/industryRegulationsMap",
        name: "institutionalMapIndustryRegulationsMap",
        component: () =>
          import(
            "../components/institutionalMap/industryRegulationsMapMain.vue"
          ),
      },
      {
        path: "/institutionalMap/orgSystemMap",
        name: "institutionalMapOrgSystemMap",
        component: () =>
          import("../components/institutionalMap/orgSystemMapMain.vue"),
      },
    ],
  },
  {
    path: "/ICNavigation",
    name: "ICNavigation",
    component: () => import("../pages/ICNavigation/index.vue"),
  },
  {
    path: "/ICMaturityTest",
    name: "ICMaturityTest",
    component: () => import("../pages/ICMaturityTest/index.vue"),
  },
  {
    path: "/ICTrainingService",
    name: "ICTrainingService",
    component: () => import("../pages/ICTrainingService/index.vue"),
  },
  {
    path: "/ICKnowledgeBase",
    name: "ICKnowledgeBase",
    component: () => import("../pages/ICKnowledgeBase/index.vue"),
  },
  {
    path: "/dataCenter",
    name: "dataCenter",
    component: () => import("../pages/dataCenter/index.vue"),
  },
  {
    path: "/generalService",
    name: "generalService",
    component: () => import("../pages/generalService/index.vue"),
  },
  {
    path: "/systemManagement",
    name: "systemManagement",
    component: () => import("../pages/systemManagement/index.vue"),
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
