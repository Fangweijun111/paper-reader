export const MIN_IMAGE_SCALE = 0.5;
export const MAX_IMAGE_SCALE = 4;
export const IMAGE_SCALE_STEP = 0.25;

export type ImageTransform = {
  scale: number;
  x: number;
  y: number;
};

export function clampImageScale(scale: number) {
  return Math.min(MAX_IMAGE_SCALE, Math.max(MIN_IMAGE_SCALE, scale));
}

export function stepImageScale(
  scale: number,
  direction: "in" | "out",
) {
  return clampImageScale(
    scale + (direction === "in" ? 1 : -1) * IMAGE_SCALE_STEP,
  );
}

export function resetImageTransform(): ImageTransform {
  return { scale: 1, x: 0, y: 0 };
}
