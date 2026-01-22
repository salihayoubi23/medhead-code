export default function AlertBox({ alert }) {
  if (!alert) return null;

  return (
    <div className={`alert alert-${alert.type}`} role="alert">
      {alert.message}
    </div>
  );
}
