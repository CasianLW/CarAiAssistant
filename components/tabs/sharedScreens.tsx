// SharedScreens.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchUnknownScreen from "@/components/screens/categories/unknown.search";
import SearchCarScreen from "@/components/screens/categories/car.search";
import SearchCategoryScreen from "@/components/screens/categories/category.search";

export type SharedTabParamList = {
  SearchUnknown: undefined;
  SearchCar: undefined;
  SearchCategory: undefined;
};

const { Screen } = createBottomTabNavigator<SharedTabParamList>();

export const sharedScreens = [
  <Screen
    key="SearchUnknown"
    name="SearchUnknown"
    component={SearchUnknownScreen}
    options={{ tabBarButton: () => null }}
  />,
  <Screen
    key="SearchCar"
    name="SearchCar"
    component={SearchCarScreen}
    options={{ tabBarButton: () => null }}
  />,
  <Screen
    key="SearchCategory"
    name="SearchCategory"
    component={SearchCategoryScreen}
    options={{ tabBarButton: () => null }}
  />,
];
