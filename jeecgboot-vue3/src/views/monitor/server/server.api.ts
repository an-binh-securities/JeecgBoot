import { defHttp } from '/@/utils/http/axios';

enum Api {
  cpuCount = '/actuator/metrics/system.cpu.count',
  cpuUsage = '/actuator/metrics/system.cpu.usage',
  processStartTime = '/actuator/metrics/process.start.time',
  processUptime = '/actuator/metrics/process.uptime',
  processCpuUsage = '/actuator/metrics/process.cpu.usage',

  jvmMemoryMax = '/actuator/metrics/jvm.memory.max',
  jvmMemoryCommitted = '/actuator/metrics/jvm.memory.committed',
  jvmMemoryUsed = '/actuator/metrics/jvm.memory.used',
  jvmBufferMemoryUsed = '/actuator/metrics/jvm.buffer.memory.used',
  jvmBufferCount = '/actuator/metrics/jvm.buffer.count',
  jvmThreadsDaemon = '/actuator/metrics/jvm.threads.daemon',
  jvmThreadsLive = '/actuator/metrics/jvm.threads.live',
  jvmThreadsPeak = '/actuator/metrics/jvm.threads.peak',
  jvmClassesLoaded = '/actuator/metrics/jvm.classes.loaded',
  jvmClassesUnloaded = '/actuator/metrics/jvm.classes.unloaded',
  jvmGcMemoryAllocated = '/actuator/metrics/jvm.gc.memory.allocated',
  jvmGcMemoryPromoted = '/actuator/metrics/jvm.gc.memory.promoted',
  jvmGcMaxDataSize = '/actuator/metrics/jvm.gc.max.data.size',
  jvmGcLiveDataSize = '/actuator/metrics/jvm.gc.live.data.size',
  jvmGcPause = '/actuator/metrics/jvm.gc.pause',

  tomcatSessionsCreated = '/actuator/metrics/tomcat.sessions.created',
  tomcatSessionsExpired = '/actuator/metrics/tomcat.sessions.expired',
  tomcatSessionsActiveCurrent = '/actuator/metrics/tomcat.sessions.active.current',
  tomcatSessionsActiveMax = '/actuator/metrics/tomcat.sessions.active.max',
  tomcatSessionsRejected = '/actuator/metrics/tomcat.sessions.rejected',

  memoryInfo = '/sys/actuator/memory/info',
}

/**
 * 查询cpu数量
 */
export const getCpuCount = () => {
  return defHttp.get({ url: Api.cpuCount }, { isTransformResponse: false });
};

/**
 * 查询系统 CPU 使用率
 */
export const getCpuUsage = () => {
  return defHttp.get({ url: Api.cpuUsage }, { isTransformResponse: false });
};

/**
 * 查询应用启动时间点
 */
export const getProcessStartTime = () => {
  return defHttp.get({ url: Api.processStartTime }, { isTransformResponse: false });
};

/**
 * 查询应用已运行时间
 */
export const getProcessUptime = () => {
  return defHttp.get({ url: Api.processUptime }, { isTransformResponse: false });
};

/**
 * 查询当前应用 CPU 使用率
 */
export const getProcessCpuUsage = () => {
  return defHttp.get({ url: Api.processCpuUsage }, { isTransformResponse: false });
};

/**
 * 查询JVM 最大内存
 */
export const getJvmMemoryMax = () => {
  return defHttp.get({ url: Api.jvmMemoryMax }, { isTransformResponse: false });
};

/**
 * JVM 可用内存
 */
export const getJvmMemoryCommitted = () => {
  return defHttp.get({ url: Api.jvmMemoryCommitted }, { isTransformResponse: false });
};

/**
 * JVM 已用内存
 */
export const getJvmMemoryUsed = () => {
  return defHttp.get({ url: Api.jvmMemoryUsed }, { isTransformResponse: false });
};

/**
 * JVM 缓冲区已用内存
 */
export const getJvmBufferMemoryUsed = () => {
  return defHttp.get({ url: Api.jvmBufferMemoryUsed }, { isTransformResponse: false });
};

/**
 *JVM 当前缓冲区数量
 */
export const getJvmBufferCount = () => {
  return defHttp.get({ url: Api.jvmBufferCount }, { isTransformResponse: false });
};

/**
 **JVM 守护线程数量
 */
export const getJvmThreadsDaemon = () => {
  return defHttp.get({ url: Api.jvmThreadsDaemon }, { isTransformResponse: false });
};

/**
 *JVM 当前活跃线程数量
 */
export const getJvmThreadsLive = () => {
  return defHttp.get({ url: Api.jvmThreadsLive }, { isTransformResponse: false });
};

/**
 *JVM 峰值线程数量
 */
export const getJvmThreadsPeak = () => {
  return defHttp.get({ url: Api.jvmThreadsPeak }, { isTransformResponse: false });
};

/**
 *JVM 已加载 Class 数量
 */
export const getJvmClassesLoaded = () => {
  return defHttp.get({ url: Api.jvmClassesLoaded }, { isTransformResponse: false });
};

/**
 *JVM 未加载 Class 数量
 */
export const getJvmClassesUnloaded = () => {
  return defHttp.get({ url: Api.jvmClassesUnloaded }, { isTransformResponse: false });
};

/**
 **GC 时, 年轻代分配的内存空间
 */
export const getJvmGcMemoryAllocated = () => {
  return defHttp.get({ url: Api.jvmGcMemoryAllocated }, { isTransformResponse: false });
};

/**
 *GC 时, 老年代分配的内存空间
 */
export const getJvmGcMemoryPromoted = () => {
  return defHttp.get({ url: Api.jvmGcMemoryPromoted }, { isTransformResponse: false });
};

/**
 *GC 时, 老年代的最大内存空间
 */
export const getJvmGcMaxDataSize = () => {
  return defHttp.get({ url: Api.jvmGcMaxDataSize }, { isTransformResponse: false });
};

/**
 *FullGC 时, 老年代的内存空间
 */
export const getJvmGcLiveDataSize = () => {
  return defHttp.get({ url: Api.jvmGcLiveDataSize }, { isTransformResponse: false });
};

/**
 *系统启动以来GC 次数
 */
export const getJvmGcPause = () => {
  return defHttp.get({ url: Api.jvmGcPause }, { isTransformResponse: false });
};

/**
 *tomcat 已创建 session 数
 */
export const getTomcatSessionsCreated = () => {
  return defHttp.get({ url: Api.tomcatSessionsCreated }, { isTransformResponse: false });
};

/**
 *tomcat 已过期 session 数
 */
export const getTomcatSessionsExpired = () => {
  return defHttp.get({ url: Api.tomcatSessionsExpired }, { isTransformResponse: false });
};

/**
 *tomcat 当前活跃 session 数
 */
export const getTomcatSessionsActiveCurrent = () => {
  return defHttp.get({ url: Api.tomcatSessionsActiveCurrent }, { isTransformResponse: false });
};

/**
 *tomcat 活跃 session 数峰值
 */
export const getTomcatSessionsActiveMax = () => {
  return defHttp.get({ url: Api.tomcatSessionsActiveMax }, { isTransformResponse: false });
};

/**
 *超过session 最大配置后，拒绝的 session 个数
 */
export const getTomcatSessionsRejected = () => {
  return defHttp.get({ url: Api.tomcatSessionsRejected }, { isTransformResponse: false });
};

/**
 * 内存信息
 */
export const getMemoryInfo = () => {
  return defHttp.get({ url: Api.memoryInfo }, { isTransformResponse: false });
};

export const getMoreInfo = (infoType) => {
  if (infoType == '1') {
    return {};
  }
  if (infoType == '2') {
    return { 'jvm.gc.pause': ['.count', '.totalTime'] };
  }
  if (infoType == '3') {
    return {
      'tomcat.global.request': ['.count', '.totalTime'],
      'tomcat.servlet.request': ['.count', '.totalTime'],
    };
  }
  if (infoType == '5') {
    return {};
  }
};

export const getTextInfo = (infoType) => {
  if (infoType == '1') {
    return {
      'system.cpu.count': { color: 'green', text: 'Số lượng CPU', unit: 'lõi' },
      'system.cpu.usage': { color: 'green', text: 'Tỷ lệ sử dụng CPU hệ thống', unit: '%', valueType: 'Number' },
      'process.start.time': { color: 'purple', text: 'Thời điểm khởi động ứng dụng', unit: '', valueType: 'Date' },
      'process.uptime': { color: 'purple', text: 'Thời gian ứng dụng đã chạy', unit: 'giây' },
      'process.cpu.usage': { color: 'purple', text: 'Tỷ lệ sử dụng CPU của ứng dụng hiện tại', unit: '%', valueType: 'Number' },
    };
  }
  if (infoType == '2') {
    return {
      'jvm.memory.max': { color: 'purple', text: 'Bộ nhớ tối đa của JVM', unit: 'MB', valueType: 'RAM' },
      'jvm.memory.committed': { color: 'purple', text: 'Bộ nhớ khả dụng của JVM', unit: 'MB', valueType: 'RAM' },
      'jvm.memory.used': { color: 'purple', text: 'Bộ nhớ đã sử dụng của JVM', unit: 'MB', valueType: 'RAM' },
      'jvm.buffer.memory.used': { color: 'cyan', text: 'Bộ nhớ đệm đã sử dụng của JVM', unit: 'MB', valueType: 'RAM' },
      'jvm.buffer.count': { color: 'cyan', text: 'Số lượng bộ đệm hiện tại', unit: 'cái' },
      'jvm.threads.daemon': { color: 'green', text: 'Số lượng luồng daemon của JVM', unit: 'cái' },
      'jvm.threads.live': { color: 'green', text: 'Số lượng luồng hoạt động hiện tại của JVM', unit: 'cái' },
      'jvm.threads.peak': { color: 'green', text: 'Số lượng luồng đỉnh điểm của JVM', unit: 'cái' },
      'jvm.classes.loaded': { color: 'orange', text: 'Số lượng Class đã tải của JVM', unit: 'cái' },
      'jvm.classes.unloaded': { color: 'orange', text: 'Số lượng Class chưa tải của JVM', unit: 'cái' },
      'jvm.gc.memory.allocated': { color: 'pink', text: 'Bộ nhớ được phân bổ trong quá trình GC', unit: 'MB', valueType: 'RAM' },
      'jvm.gc.memory.promoted': { color: 'pink', text: 'Bộ nhớ được phân bổ trong quá trình GC cho old generation', unit: 'MB', valueType: 'RAM' },
      'jvm.gc.max.data.size': { color: 'pink', text: 'Kích thước bộ nhớ tối đa của old generation trong quá trình GC', unit: 'MB', valueType: 'RAM' },
      'jvm.gc.live.data.size': { color: 'pink', text: 'Kích thước bộ nhớ của old generation trong quá trình FullGC', unit: 'MB', valueType: 'RAM' },
      'jvm.gc.pause.count': { color: 'blue', text: 'Số lần GC kể từ khi hệ thống khởi động', unit: 'lần' },
      'jvm.gc.pause.totalTime': { color: 'blue', text: 'Tổng thời gian GC kể từ khi hệ thống khởi động', unit: 'giây' },
    };
  }
  if (infoType == '3') {
    return {
      'tomcat.sessions.created': { color: 'green', text: 'Số lượng session đã tạo của tomcat', unit: 'cái' },
      'tomcat.sessions.expired': { color: 'green', text: 'Số lượng session đã hết hạn của tomcat', unit: 'cái' },
      'tomcat.sessions.active.current': { color: 'green', text: 'Số lượng session hoạt động hiện tại của tomcat', unit: 'cái' },
      'tomcat.sessions.active.max': { color: 'green', text: 'Số lượng session hoạt động tối đa của tomcat', unit: 'cái' },
      'tomcat.sessions.rejected': { color: 'green', text: 'Số lượng session bị từ chối sau khi vượt quá cấu hình tối đa', unit: 'cái' },
      'tomcat.global.sent': { color: 'purple', text: 'Số byte đã gửi', unit: 'bytes' },
      'tomcat.global.request.max': { color: 'purple', text: 'Thời gian yêu cầu dài nhất', unit: 'giây' },
      'tomcat.global.request.count': { color: 'purple', text: 'Số lượng yêu cầu toàn cầu', unit: 'lần' },
      'tomcat.global.request.totalTime': { color: 'purple', text: 'Tổng thời gian yêu cầu toàn cầu', unit: 'giây' },
      'tomcat.servlet.request.max': { color: 'cyan', text: 'Thời gian yêu cầu servlet dài nhất', unit: 'giây' },
      'tomcat.servlet.request.count': { color: 'cyan', text: 'Tổng số yêu cầu servlet', unit: 'lần' },
      'tomcat.servlet.request.totalTime': { color: 'cyan', text: 'Tổng thời gian yêu cầu servlet', unit: 'giây' },
      'tomcat.threads.current': { color: 'pink', text: 'Số lượng luồng hiện tại của tomcat (bao gồm cả luồng daemon)', unit: 'cái' },
      'tomcat.threads.config.max': { color: 'pink', text: 'Số lượng luồng tối đa được cấu hình của tomcat', unit: 'cái' },
    };
  }
  if (infoType == '5') {
    return {
      'memory.physical.total': { color: 'green', text: 'Tổng bộ nhớ vật lý', unit: 'MB', valueType: 'RAM' },
      'memory.physical.used': { color: 'green', text: 'Bộ nhớ vật lý đã sử dụng', unit: 'MB', valueType: 'RAM' },
      'memory.physical.free': { color: 'green', text: 'Bộ nhớ vật lý khả dụng', unit: 'MB', valueType: 'RAM' },
      'memory.physical.usage': { color: 'green', text: 'Tỷ lệ sử dụng bộ nhớ vật lý', unit: '%', valueType: 'Number' },
      'memory.runtime.total': { color: 'purple', text: 'Tổng bộ nhớ JVM', unit: 'MB', valueType: 'RAM' },
      'memory.runtime.used': { color: 'purple', text: 'Bộ nhớ JVM đã sử dụng', unit: 'MB', valueType: 'RAM' },
      'memory.runtime.max': { color: 'purple', text: 'Bộ nhớ JVM tối đa', unit: 'MB', valueType: 'RAM' },
      'memory.runtime.free': { color: 'purple', text: 'Bộ nhớ JVM khả dụng', unit: 'MB', valueType: 'RAM' },
      'memory.runtime.usage': { color: 'purple', text: 'Tỷ lệ sử dụng bộ nhớ JVM', unit: '%', valueType: 'Number' },
    };
  }
};

/**
 * 查询cpu数量
 * @param params
 */
export const getServerInfo = (infoType) => {
  if (infoType == '1') {
    return Promise.all([getCpuCount(), getCpuUsage(), getProcessStartTime(), getProcessUptime(), getProcessCpuUsage()]);
  }
  if (infoType == '2') {
    return Promise.all([
      getJvmMemoryMax(),
      getJvmMemoryCommitted(),
      getJvmMemoryUsed(),
      getJvmBufferCount(),
      getJvmBufferMemoryUsed(),
      getJvmThreadsDaemon(),
      getJvmThreadsLive(),
      getJvmThreadsPeak(),
      getJvmClassesLoaded(),
      getJvmClassesUnloaded(),
      getJvmGcLiveDataSize(),
      getJvmGcMaxDataSize(),
      getJvmGcMemoryAllocated(),
      getJvmGcMemoryPromoted(),
      getJvmGcPause(),
    ]);
  }
  if (infoType == '3') {
    return Promise.all([
      getTomcatSessionsActiveCurrent(),
      getTomcatSessionsActiveMax(),
      getTomcatSessionsCreated(),
      getTomcatSessionsExpired(),
      getTomcatSessionsRejected(),
    ]);
  }
  if (infoType == '5') {
    return Promise.all([getMemoryInfo()]);
  }
};
