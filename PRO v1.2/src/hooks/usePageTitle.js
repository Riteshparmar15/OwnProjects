import { useEffect } from "react";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | ProStafff Solution`
      : "ProStafff Solution | Retail Staffing Partner";
  }, [title]);
}
