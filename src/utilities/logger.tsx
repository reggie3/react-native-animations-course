export enum LoggerType {
  ERROR = "ERROR",
  INFO = "INFO",
  WARN = "WARN"
}

const Logger = {
  log: (msg: string, type: LoggerType) => {
    if (type === LoggerType.ERROR) {
      console.log("INFO: ", msg);
    } else if (type === LoggerType.INFO) {
      console.warn("WARN: ", msg);
    } else if (type === LoggerType.WARN) {
      console.error("ERROR: ", msg);
    }
  }
};

export default Logger;
