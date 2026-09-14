"use client";

import {
  type PointerEvent as ReactPointerEvent,
  type WheelEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  resetImageTransform,
  stepImageScale,
  type ImageTransform,
} from "../lib/image-lightbox";

export type LightboxImage = {
  src: string;
  alt: string;
};

type Props = {
  image: LightboxImage | null;
  onClose: () => void;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
};

const DEFAULT_TRANSFORM = resetImageTransform();

export function PaperImageLightbox({ image, onClose }: Props) {
  const imageSrc = image?.src;
  const [transform, setTransform] = useState<ImageTransform>(DEFAULT_TRANSFORM);
  const [imageFailed, setImageFailed] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dragRef = useRef<DragState | null>(null);

  useEffect(() => {
    if (!imageSrc) return;
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const animationFrame = window.requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );
    return () => {
      window.cancelAnimationFrame(animationFrame);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
      dragRef.current = null;
    };
  }, [imageSrc]);

  useEffect(() => {
    if (!image) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [image, onClose]);

  if (!image) return null;

  const reset = () => setTransform(resetImageTransform());
  const zoom = (direction: "in" | "out") => {
    setTransform((current) => ({
      ...current,
      scale: stepImageScale(current.scale, direction),
    }));
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    zoom(event.deltaY < 0 ? "in" : "out");
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (transform.scale <= 1) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: transform.x,
      originY: transform.y,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setTransform((current) => ({
      ...current,
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    }));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const displayAlt = image.alt || "论文图片";

  return (
    <div
      aria-label={`放大查看：${displayAlt}`}
      aria-modal="true"
      className="image-lightbox-overlay"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
      role="dialog"
    >
      <section className="image-lightbox">
        <header className="image-lightbox__toolbar">
          <p>{displayAlt}</p>
          <div>
            <button aria-label="缩小" disabled={transform.scale <= 0.5} onClick={() => zoom("out")} type="button">
              −
            </button>
            <button aria-label="重置缩放" onClick={reset} type="button">
              {Math.round(transform.scale * 100)}%
            </button>
            <button aria-label="放大" disabled={transform.scale >= 4} onClick={() => zoom("in")} type="button">
              +
            </button>
            <button aria-label="关闭图片" className="image-lightbox__close" onClick={onClose} ref={closeButtonRef} type="button">
              关闭 ×
            </button>
          </div>
        </header>
        <div
          className={`image-lightbox__stage${transform.scale > 1 ? " is-draggable" : ""}`}
          onDoubleClick={() =>
            setTransform((current) =>
              current.scale > 1 ? resetImageTransform() : { ...current, scale: 2 },
            )
          }
          onPointerCancel={endDrag}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onWheel={onWheel}
        >
          {imageFailed ? (
            <div className="image-lightbox__error" role="status">
              <strong>图片无法加载</strong>
              <span>请关闭后重试，或从原始 PDF 查看该图。</span>
            </div>
          ) : (
            <img
              alt={displayAlt}
              className="image-lightbox__image"
              draggable={false}
              onError={() => setImageFailed(true)}
              src={image.src}
              style={{
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
              }}
            />
          )}
        </div>
        <footer className="image-lightbox__hint">
          滚轮或按钮缩放 · 放大后拖动查看 · 双击切换 2× · ESC 关闭
        </footer>
      </section>
    </div>
  );
}
