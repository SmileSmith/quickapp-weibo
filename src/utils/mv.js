import fetch from '@system.fetch';
import storage from '@system.storage';
import prompt from '@system.prompt';
import router from '@system.router';
import shortcut from '@system.shortcut';

/**
 * 显示菜单
 */
function showMenu() {
  var appInfo = require('@system.app').getInfo();
  prompt.showContextMenu({
    itemList: ['保存桌面', '关于', '取消'],
    success: function(ret) {
      switch (ret.index) {
        case 0:
          // 保存桌面
          createShortcut();
          break;
        case 1:
          // 关于
          router.push({
            uri: '/pages/About',
            params: { name: appInfo.name, icon: appInfo.icon },
          });
          break;
        case 2:
          // 取消
          break;
        default:
          prompt.showToast({ message: 'error' });
      }
    },
  });
}

/**
 * 创建桌面图标
 * 注意：使用加载器测试`创建桌面快捷方式`功能时，请先在`系统设置`中打开`应用加载器`的`桌面快捷方式`权限
 */
function createShortcut() {
  shortcut.hasInstalled({
    success: function(ret) {
      if (ret) {
        prompt.showToast({ message: '已创建桌面图标' });
      } else {
        shortcut.install({
          success: function() {
            prompt.showToast({ message: '成功创建桌面图标' });
          },
          fail: function(errmsg, errcode) {
            prompt.showToast({ message: 'error: ' + errcode + '---' + errmsg });
          },
        });
      }
    },
  });
}


/**
 * 封装网络请求中的JSON.parse
 *
 * @param {any} 请求参数，含url、method、data、header等
 * @returns Promise
 */
function request(obj){
  return new Promise((resolve, reject) => {
    fetch.fetch({
      ...obj,
      success: (res) =>{
        try {
          res.data = JSON.parse(res.data);
          resolve(res);
        } catch (err) {
          console.error(err);
        }
      },
      fail: reject,
    });
  });
}

const wx = wx;

// 全局mv对象
const mv = {};

if (!wx) {
  mv.request = request;
  mv.setStorage = storage.set;
  mv.getStorage = storage.get;
  mv.removeStorage = storage.delete;
  mv.showToast = prompt.showToast;
  mv.showModal = prompt.showDialog;
  mv.navigateTo = router.push;
  mv.navigateBack = router.back;
  mv.redirectTo = router.replace;
  mv.showMenu = showMenu;
  mv.createShortcut = createShortcut;
}

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
  // 快应用菜单栏
  showMenu: mv.showMenu,
  // 快应用创建快捷方式
  createShortcut: mv.createShortcut,

  // 网络请求
  request: mv.request,
  // 界面交互
  showToast: obj => toPromise(mv.showToast, obj),
  // showLoading: obj => toPromise(mv.showLoading, obj),
  showModal: obj => toPromise(mv.showModal, obj),
  // showActionSheet: obj => toPromise(mv.showActionSheet, obj),
  // // 导航条
  // setNavigationBarTitle: obj => toPromise(mv.setNavigationBarTitle, obj),
  // setNavigationBarColor: obj => toPromise(mv.setNavigationBarColor, obj),
  // setTopBarText: obj => toPromise(mv.setTopBarText, obj),
  // // 导航
  navigateTo: obj => toPromise(mv.navigateTo, obj),
  redirectTo: obj => toPromise(mv.redirectTo, obj),
  // switchTab: obj => toPromise(mv.switchTab, obj),
  // reLaunch: obj => toPromise(mv.reLaunch, obj),
  navigateBack: obj => toPromise(mv.navigateBack, obj),

  // // 用户相关
  // login: obj => toPromise(mv.login, obj),
  // checkSession: obj => toPromise(mv.checkSession, obj),
  // authorize: obj => toPromise(mv.authorize, obj),
  // getUserInfo: obj => toPromise(mv.getUserInfo, obj),

  // // 支付
  // requestPayment: obj => toPromise(mv.requestPayment, obj),

  // // 图片
  // chooseImage: obj => toPromise(mv.chooseImage, obj),
  // previewImage: obj => toPromise(mv.previewImage, obj),
  // getImageInfo: obj => toPromise(mv.getImageInfo, obj),
  // saveImageToPhotosAlbum: obj => toPromise(mv.saveImageToPhotosAlbum, obj),

  // // 文件
  // uploadFile: obj => toPromise(mv.uploadFile, obj),
  // downloadFile: obj => toPromise(mv.downloadFile, obj),

  // // 录音
  // startRecord: obj => toPromise(mv.startRecord, obj),

  // // 音频播放
  // playVoice: obj => toPromise(mv.playVoice, obj),

  // // 音乐播放
  // getBackgroundAudioPlayerState: obj => toPromise(mv.getBackgroundAudioPlayerState, obj),
  // playBackgroundAudio: obj => toPromise(mv.playBackgroundAudio, obj),
  // seekBackgroundAudio: obj => toPromise(mv.seekBackgroundAudio, obj),

  // // 视频
  // chooseVideo: obj => toPromise(mv.chooseVideo, obj),
  // saveVideoToPhotosAlbum: obj => toPromise(mv.saveVideoToPhotosAlbum, obj),

  // // 文件
  // saveFile: obj => toPromise(mv.saveFile, obj),
  // getFileInfo: obj => toPromise(mv.getFileInfo, obj),
  // getSavedFileList: obj => toPromise(mv.getSavedFileList, obj),
  // getSavedFileInfo: obj => toPromise(mv.getSavedFileInfo, obj),
  // removeSavedFile: obj => toPromise(mv.removeSavedFile, obj),
  // openDocument: obj => toPromise(mv.openDocument, obj),

  // // 数据缓存
  setStorage: (obj) => toPromise(mv.setStorage, obj),
  getStorage: (obj) => toPromise(mv.getStorage, obj),
  // getStorageInfo: obj => toPromise(mv.getStorageInfo, obj),
  removeStorage: (obj) => toPromise(mv.removeStorage, obj),

  // // 位置
  // getLocation: obj => toPromise(mv.getLocation, obj),
  // chooseLocation: obj => toPromise(mv.chooseLocation, obj),
  // openLocation: obj => toPromise(mv.openLocation, obj),

  // // 设备
  // getSystemInfo: obj => toPromise(mv.getSystemInfo, obj),
  // getNetworkType: obj => toPromise(mv.getNetworkType, obj),
  // startAccelerometer: obj => toPromise(mv.startAccelerometer, obj),
  // stopAccelerometer: obj => toPromise(mv.stopAccelerometer, obj),
  // startCompass: obj => toPromise(mv.startCompass, obj),
  // stopCompass: obj => toPromise(mv.stopCompass, obj),
  // // 打电话
  // makePhoneCall: obj => toPromise(mv.makePhoneCall, obj),
  // // 扫码
  // scanCode: obj => toPromise(mv.scanCode, obj),
  // // 剪切板
  // setClipboardData: obj => toPromise(mv.setClipboardData, obj),
  // getClipboardData: obj => toPromise(mv.getClipboardData, obj),
  // // 蓝牙
  // openBluetoothAdapter: obj => toPromise(mv.openBluetoothAdapter, obj),
  // closeBluetoothAdapter: obj => toPromise(mv.closeBluetoothAdapter, obj),
  // getBluetoothAdapterState: obj => toPromise(mv.getBluetoothAdapterState, obj),
  // startBluetoothDevicesDiscovery: obj => toPromise(mv.startBluetoothDevicesDiscovery, obj),
  // stopBluetoothDevicesDiscovery: obj => toPromise(mv.stopBluetoothDevicesDiscovery, obj),
  // getBluetoothDevices: obj => toPromise(mv.getBluetoothDevices, obj),
  // getConnectedBluetoothDevices: obj => toPromise(mv.getConnectedBluetoothDevices, obj),
  // createBLEConnection: obj => toPromise(mv.createBLEConnection, obj),
  // closeBLEConnection: obj => toPromise(mv.closeBLEConnection, obj),
  // getBLEDeviceServices: obj => toPromise(mv.getBLEDeviceServices, obj),
  // // iBeacon
  // startBeaconDiscovery: obj => toPromise(mv.startBeaconDiscovery, obj),
  // stopBeaconDiscovery: obj => toPromise(mv.stopBeaconDiscovery, obj),
  // getBeacons: obj => toPromise(mv.getBeacons, obj),
  // // 屏幕亮度
  // setScreenBrightness: obj => toPromise(mv.setScreenBrightness, obj),
  // getScreenBrightness: obj => toPromise(mv.getScreenBrightness, obj),
  // setKeepScreenOn: obj => toPromise(mv.setKeepScreenOn, obj),
  // // 振动
  // vibrateLong: obj => toPromise(mv.vibrateLong, obj),
  // vibrateShort: obj => toPromise(mv.vibrateShort, obj),
  // // 联系人
  // addPhoneContact: obj => toPromise(mv.addPhoneContact, obj),
  // // NFC
  // getHCEState: obj => toPromise(mv.getHCEState, obj),
  // startHCE: obj => toPromise(mv.startHCE, obj),
  // stopHCE: obj => toPromise(mv.stopHCE, obj),
  // sendHCEMessage: obj => toPromise(mv.sendHCEMessage, obj),
  // // Wi-Fi
  // startWifi: obj => toPromise(mv.startWifi, obj),
  // stopWifi: obj => toPromise(mv.stopWifi, obj),
  // connectWifi: obj => toPromise(mv.connectWifi, obj),
  // getWifiList: obj => toPromise(mv.getWifiList, obj),
  // setWifiList: obj => toPromise(mv.setWifiList, obj),
  // getConnectedWifi: obj => toPromise(mv.getConnectedWifi, obj),

  // // 第三方平台
  // getExtConfig: obj => toPromise(mv.getExtConfig, obj),

  // // 转发
  // showShareMenu: obj => toPromise(mv.showShareMenu, obj),
  // hideShareMenu: obj => toPromise(mv.hideShareMenu, obj),
  // updateShareMenu: obj => toPromise(mv.updateShareMenu, obj),
  // getShareInfo: obj => toPromise(mv.getShareInfo, obj),

  // // 收货地址
  // chooseAddress: obj => toPromise(mv.chooseAddress, obj),

  // // 卡券
  // addCard: obj => toPromise(mv.addCard, obj),
  // openCard: obj => toPromise(mv.openCard, obj),

  // // 设置
  // openSetting: obj => toPromise(mv.openSetting, obj),
  // getSetting: obj => toPromise(mv.getSetting, obj),

  // // 微信运动
  // getWeRunData: obj => toPromise(mv.getWeRunData, obj),

  // // 打开小程序
  // navigateToMiniProgram: obj => toPromise(mv.navigateToMiniProgram, obj),
  // navigateBackMiniProgram: obj => toPromise(mv.navigateBackMiniProgram, obj),

  // // 获取发票抬头
  // chooseInvoiceTitle: obj => toPromise(mv.chooseInvoiceTitle, obj),

  // // 生物认证
  // checkIsSupportSoterAuthentication: obj => toPromise(mv.checkIsSupportSoterAuthentication, obj),
  // startSoterAuthentication: obj => toPromise(mv.startSoterAuthentication, obj),
  // checkIsSoterEnrolledInDevice: obj => toPromise(mv.checkIsSoterEnrolledInDevice, obj),
};
