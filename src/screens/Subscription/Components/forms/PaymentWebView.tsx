import React, {useRef} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {RouteProp, useRoute} from '@react-navigation/native';

type PaymentWebViewParams = {
  PaymentWebView: {
    encRequest: string;
    accessCode: string;
  };
};

export default function PaymentWebView({navigation}: any) {
  const route = useRoute<RouteProp<PaymentWebViewParams, 'PaymentWebView'>>();
  const {encRequest, accessCode} = route.params;

  const webviewRef = useRef<WebView>(null);

  const ccAvenueUrl =
    'https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

  const formData = `encRequest=${encodeURIComponent(
    encRequest,
  )}&access_code=${encodeURIComponent(accessCode)}`;
  console.log('body data', formData);

  return (
    <View style={{flex: 1}}>
      <WebView
        ref={webviewRef}
        source={{
          uri: ccAvenueUrl,
          method: 'POST',
          body: formData,
        }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator color="#000" size="large" style={styles.loader} />
        )}
        onNavigationStateChange={navState => {
          console.log('🌐 Payment URL: ', navState.url);

          if (navState.url.includes('ccavenue/response')) {
            console.log('✅ Payment completed.');
            // 👉 After success, navigate to MyPlan screen
            navigation.replace('MyPlan');
          }
          if (
            navState.url.includes('cancel') ||
            navState.url.includes('subscriptionFailed')
          ) {
            console.log('❌ Payment cancelled.');
            navigation.replace('Registartion');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
  },
});
