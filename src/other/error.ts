export const getErrorMessage = (code: string) => {
  switch (code) {
    case "":
      return "";
    case "auth/invalid-email":
      return "유효하지 않은 이메일 형식입니다.";
    case "auth/popup-closed-by-user":
      return "비정상적인 접근입니다.";
    default:
      return getAlternativeErrorMessage(code);
  }
};

const getAlternativeErrorMessage = (message: string) => {
  let result;
  const regexMessage = message.match(/(?:\/)(.+)/);
  if (regexMessage) {
    result = regexMessage[1];
  } else result = "에러가 발생했습니다.";

  return result;
};

// 값을 입력하지 않았을 때..
