// SharedScreens.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchUnknownScreen from "@/components/screens/categories/unknown.search";
import SearchCarScreen from "@/components/screens/categories/car.search";
import SearchCategoryScreen from "@/components/screens/categories/category.search";
import SearchResultsScreen from "../screens/results/results.screen";

export type SharedTabParamList = {
  SearchUnknown: undefined;
  SearchCar: undefined;
  SearchCategory: undefined;
  SearchResults: undefined;
};

const { Screen } = createBottomTabNavigator<SharedTabParamList>();

export const sharedScreens = [
  <Screen
    key="SearchUnknown"
    name="SearchUnknown"
    component={SearchUnknownScreen}
    options={{ tabBarButton: () => null, headerShown: false }}
  />,
  <Screen
    key="SearchCar"
    name="SearchCar"
    component={SearchCarScreen}
    options={{ tabBarButton: () => null, headerShown: false }}
  />,
  <Screen
    key="SearchCategory"
    name="SearchCategory"
    component={SearchCategoryScreen}
    options={{ tabBarButton: () => null, headerShown: false }}
  />,
  <Screen
    key="SearchResults"
    name="SearchResults"
    component={SearchResultsScreen}
    options={{ tabBarButton: () => null, headerShown: false }}
  />,
];
