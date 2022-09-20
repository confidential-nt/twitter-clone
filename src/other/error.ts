const getErrorMessage = (code: string) => {
  switch (code) {
    case "auth/invalid-email":
      return "유효하지 않은 이메일 형식입니다.";
    default:
      return undefined;
  }
};

// 값을 입력하지 않았을 때..

export default getErrorMessage;
