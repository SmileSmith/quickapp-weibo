import fetch from '@system.fetch';
import storage from '@system.storage';
import prompt from '@system.prompt';
import router from '@system.router';

// 全局mv对象
const mv = {};

mv.request = fetch.fetch;
mv.setStorage = storage.set;
mv.getStorage = storage.get;
mv.removeStorage = storage.delete;
mv.showToast = prompt.showToast;
mv.showModal = prompt.showDialog;
mv.navigateTo = router.push;
mv.navigateBack = router.back;
mv.redirectTo = router.replace;

/**
 * Promise转换函数
 *
 * @param {any} func
 * @param {any} obj
 * @returns
 */
function toPromise(func, obj) {
  return new Promise((resolve, reject) => {
    func({
      ...obj,
      success: resolve,
      fail: reject,
    });
  });
}

export default {
  // 网络请求
  request: (obj) => toPromise(mv.request, obj),
  // 界面交互
  showToast: obj => toPromise(mv.showToast, obj),
  // showLoading: obj => f(mv.showLoading, obj),
  showModal: obj => toPromise(mv.showModal, obj),
  // showActionSheet: obj => f(mv.showActionSheet, obj),
  // // 导航条
  // setNavigationBarTitle: obj => f(mv.setNavigationBarTitle, obj),
  // setNavigationBarColor: obj => f(mv.setNavigationBarColor, obj),
  // setTopBarText: obj => f(mv.setTopBarText, obj),
  // // 导航
  navigateTo: obj => toPromise(mv.navigateTo, obj),
  redirectTo: obj => toPromise(mv.redirectTo, obj),
  // switchTab: obj => f(mv.switchTab, obj),
  // reLaunch: obj => f(mv.reLaunch, obj),
  navigateBack: obj => toPromise(mv.navigateBack, obj),

  // // 用户相关
  // login: obj => f(mv.login, obj),
  // checkSession: obj => f(mv.checkSession, obj),
  // authorize: obj => f(mv.authorize, obj),
  // getUserInfo: obj => f(mv.getUserInfo, obj),

  // // 支付
  // requestPayment: obj => f(mv.requestPayment, obj),

  // // 图片
  // chooseImage: obj => f(mv.chooseImage, obj),
  // previewImage: obj => f(mv.previewImage, obj),
  // getImageInfo: obj => f(mv.getImageInfo, obj),
  // saveImageToPhotosAlbum: obj => f(mv.saveImageToPhotosAlbum, obj),

  // // 文件
  // uploadFile: obj => f(mv.uploadFile, obj),
  // downloadFile: obj => f(mv.downloadFile, obj),

  // // 录音
  // startRecord: obj => f(mv.startRecord, obj),

  // // 音频播放
  // playVoice: obj => f(mv.playVoice, obj),

  // // 音乐播放
  // getBackgroundAudioPlayerState: obj => f(mv.getBackgroundAudioPlayerState, obj),
  // playBackgroundAudio: obj => f(mv.playBackgroundAudio, obj),
  // seekBackgroundAudio: obj => f(mv.seekBackgroundAudio, obj),

  // // 视频
  // chooseVideo: obj => f(mv.chooseVideo, obj),
  // saveVideoToPhotosAlbum: obj => f(mv.saveVideoToPhotosAlbum, obj),

  // // 文件
  // saveFile: obj => f(mv.saveFile, obj),
  // getFileInfo: obj => f(mv.getFileInfo, obj),
  // getSavedFileList: obj => f(mv.getSavedFileList, obj),
  // getSavedFileInfo: obj => f(mv.getSavedFileInfo, obj),
  // removeSavedFile: obj => f(mv.removeSavedFile, obj),
  // openDocument: obj => f(mv.openDocument, obj),

  // // 数据缓存
  setStorage: (obj) => toPromise(mv.setStorage, obj),
  getStorage: (obj) => toPromise(mv.getStorage, obj),
  // getStorageInfo: obj => f(mv.getStorageInfo, obj),
  removeStorage: (obj) => toPromise(mv.removeStorage, obj),

  // // 位置
  // getLocation: obj => f(mv.getLocation, obj),
  // chooseLocation: obj => f(mv.chooseLocation, obj),
  // openLocation: obj => f(mv.openLocation, obj),

  // // 设备
  // getSystemInfo: obj => f(mv.getSystemInfo, obj),
  // getNetworkType: obj => f(mv.getNetworkType, obj),
  // startAccelerometer: obj => f(mv.startAccelerometer, obj),
  // stopAccelerometer: obj => f(mv.stopAccelerometer, obj),
  // startCompass: obj => f(mv.startCompass, obj),
  // stopCompass: obj => f(mv.stopCompass, obj),
  // // 打电话
  // makePhoneCall: obj => f(mv.makePhoneCall, obj),
  // // 扫码
  // scanCode: obj => f(mv.scanCode, obj),
  // // 剪切板
  // setClipboardData: obj => f(mv.setClipboardData, obj),
  // getClipboardData: obj => f(mv.getClipboardData, obj),
  // // 蓝牙
  // openBluetoothAdapter: obj => f(mv.openBluetoothAdapter, obj),
  // closeBluetoothAdapter: obj => f(mv.closeBluetoothAdapter, obj),
  // getBluetoothAdapterState: obj => f(mv.getBluetoothAdapterState, obj),
  // startBluetoothDevicesDiscovery: obj => f(mv.startBluetoothDevicesDiscovery, obj),
  // stopBluetoothDevicesDiscovery: obj => f(mv.stopBluetoothDevicesDiscovery, obj),
  // getBluetoothDevices: obj => f(mv.getBluetoothDevices, obj),
  // getConnectedBluetoothDevices: obj => f(mv.getConnectedBluetoothDevices, obj),
  // createBLEConnection: obj => f(mv.createBLEConnection, obj),
  // closeBLEConnection: obj => f(mv.closeBLEConnection, obj),
  // getBLEDeviceServices: obj => f(mv.getBLEDeviceServices, obj),
  // // iBeacon
  // startBeaconDiscovery: obj => f(mv.startBeaconDiscovery, obj),
  // stopBeaconDiscovery: obj => f(mv.stopBeaconDiscovery, obj),
  // getBeacons: obj => f(mv.getBeacons, obj),
  // // 屏幕亮度
  // setScreenBrightness: obj => f(mv.setScreenBrightness, obj),
  // getScreenBrightness: obj => f(mv.getScreenBrightness, obj),
  // setKeepScreenOn: obj => f(mv.setKeepScreenOn, obj),
  // // 振动
  // vibrateLong: obj => f(mv.vibrateLong, obj),
  // vibrateShort: obj => f(mv.vibrateShort, obj),
  // // 联系人
  // addPhoneContact: obj => f(mv.addPhoneContact, obj),
  // // NFC
  // getHCEState: obj => f(mv.getHCEState, obj),
  // startHCE: obj => f(mv.startHCE, obj),
  // stopHCE: obj => f(mv.stopHCE, obj),
  // sendHCEMessage: obj => f(mv.sendHCEMessage, obj),
  // // Wi-Fi
  // startWifi: obj => f(mv.startWifi, obj),
  // stopWifi: obj => f(mv.stopWifi, obj),
  // connectWifi: obj => f(mv.connectWifi, obj),
  // getWifiList: obj => f(mv.getWifiList, obj),
  // setWifiList: obj => f(mv.setWifiList, obj),
  // getConnectedWifi: obj => f(mv.getConnectedWifi, obj),

  // // 第三方平台
  // getExtConfig: obj => f(mv.getExtConfig, obj),

  // // 转发
  // showShareMenu: obj => f(mv.showShareMenu, obj),
  // hideShareMenu: obj => f(mv.hideShareMenu, obj),
  // updateShareMenu: obj => f(mv.updateShareMenu, obj),
  // getShareInfo: obj => f(mv.getShareInfo, obj),

  // // 收货地址
  // chooseAddress: obj => f(mv.chooseAddress, obj),

  // // 卡券
  // addCard: obj => f(mv.addCard, obj),
  // openCard: obj => f(mv.openCard, obj),

  // // 设置
  // openSetting: obj => f(mv.openSetting, obj),
  // getSetting: obj => f(mv.getSetting, obj),

  // // 微信运动
  // getWeRunData: obj => f(mv.getWeRunData, obj),

  // // 打开小程序
  // navigateToMiniProgram: obj => f(mv.navigateToMiniProgram, obj),
  // navigateBackMiniProgram: obj => f(mv.navigateBackMiniProgram, obj),

  // // 获取发票抬头
  // chooseInvoiceTitle: obj => f(mv.chooseInvoiceTitle, obj),

  // // 生物认证
  // checkIsSupportSoterAuthentication: obj => f(mv.checkIsSupportSoterAuthentication, obj),
  // startSoterAuthentication: obj => f(mv.startSoterAuthentication, obj),
  // checkIsSoterEnrolledInDevice: obj => f(mv.checkIsSoterEnrolledInDevice, obj),
};
