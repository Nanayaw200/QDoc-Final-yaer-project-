import React from "react";
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from "react";
import { Platform } from "react-native";

export const useWarmUpBrowser = () => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            WebBrowser.warmUpAsync();
            return () => {
                WebBrowser.coolDownAsync();
            };
        }
    }, []);
};    