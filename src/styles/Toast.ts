import { ToastOptions, toast } from "react-toastify";

interface ToastProps {
  type: "success" | "error" | "info" | "action" | "warning";
  message?: string;
}

const toastOptions: ToastOptions = {
  position: "bottom-center", // 알람 위치 지정
  autoClose: 2000, // 자동 off 시간
  hideProgressBar: false, // 진행시간바 숨김
  closeOnClick: true, // 클릭으로 알람 닫기
  rtl: false, // 알림 좌우 반전
  pauseOnFocusLoss: true, // 화면을 벗어나면 알람 정지
  draggable: false, // 드래그 가능
  pauseOnHover: false, // 마우스를 올리면 알람 정지
  theme: "light",
};

export function showToast({ type, message }: ToastProps) {
  switch (type) {
    case "success":
      // enum으로 타입 지정했을 때 가독성 상승 -> case ToastType.success:
      toast.success(message || "성공적으로 완료되었습니다", {
        ...toastOptions,
      });
      return;
    case "error":
      toast.error(message || "에러가 발생하였습니다.", {
        ...toastOptions,
      });
      return;
    case "warning":
      toast.warning(message || "다시 한번 시도해주세요", {
        ...toastOptions,
      });
  }
}
