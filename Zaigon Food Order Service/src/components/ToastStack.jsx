export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`toast toast-${toast.type}`}
          onClick={() => onDismiss(toast.id)}
        >
          <span className="toast-dot" />
          <span>{toast.message}</span>
        </button>
      ))}
    </div>
  )
}
