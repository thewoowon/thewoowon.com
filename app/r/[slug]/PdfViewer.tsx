"use client";

import { useEffect, useRef } from "react";

/**
 * 인라인 PDF 뷰어.
 *
 * 브라우저 내장 PDF 플러그인은 로드가 끝나면 스스로 포커스를 가져가고, 그 바람에
 * 페이지가 뷰어 위치로 튄다(측정값: 306px). 링크를 받은 사람이 맞춤 인트로를
 * 건너뛰고 착지하게 되므로, 사용자가 아직 직접 스크롤하지 않았다면 위치를 되돌린다.
 */
export default function PdfViewer({ src, title }: { src: string; title: string }) {
  const userScrolled = useRef(false);

  useEffect(() => {
    const markScrolled = () => {
      userScrolled.current = true;
    };
    // 사용자가 스스로 움직였다면 그 위치를 존중한다.
    const events = ["wheel", "touchmove", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, markScrolled, { passive: true }));

    // 포커스 탈취 시점이 load 직후로 일정하지 않아 짧게 몇 번 되돌린다.
    const start = window.scrollY;
    const timers = [0, 120, 400, 900].map((delay) =>
      window.setTimeout(() => {
        if (!userScrolled.current && window.scrollY !== start) {
          window.scrollTo(0, start);
        }
      }, delay)
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, markScrolled));
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return (
    <iframe
      src={src}
      title={title}
      className="h-[80vh] w-full rounded border border-hairline bg-raised"
    />
  );
}
