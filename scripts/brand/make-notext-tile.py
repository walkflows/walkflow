"""Builds public/brand/logo-icon-orange-notext.png from the approved tile public/brand/logo-icon-orange.png.

The approved tile has "Walkflow Agcy." baked in around the 3D W. Nothing about the W or the ball is changed: only the lettering
and its soft shadows are replaced with the tile's own smooth orange background (estimated from the clean parts of the same image).
    pip install opencv-python-headless numpy ;  python scripts/brand/make-notext-tile.py
"""
import cv2, numpy as np
src = "public/brand/logo-icon-orange.png"
im = cv2.imread(src); h, w = im.shape[:2]
g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
dark = (g < 110).astype(np.uint8)
n, lab, stats, cent = cv2.connectedComponentsWithStats(dark, connectivity=8)
keep = [i for i in range(1, n) if stats[i, cv2.CC_STAT_AREA] > 15000]          # the W and the ball
text = [i for i in range(1, n) if i not in keep and cent[i][1] < 780]           # the lettering (all of it sits above the bottom of the W)
E = lambda k: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (k, k))
keep_mask = np.isin(lab, keep).astype(np.uint8) * 255
text_mask = np.isin(lab, text).astype(np.uint8) * 255

# 1) smooth background estimate: use only pixels that are plainly "tile orange" (bright, far from any object), fill the rest from them
hsv = cv2.cvtColor(im, cv2.COLOR_BGR2HSV)
objects = cv2.dilate(((g < 110).astype(np.uint8)) * 255, E(31))
clean = ((hsv[..., 2] >= 246) & (objects == 0)).astype(np.uint8)
s = 6
small = cv2.resize(im, (w // s, h // s), interpolation=cv2.INTER_AREA)
fillmask = cv2.resize((1 - clean) * 255, (w // s, h // s), interpolation=cv2.INTER_NEAREST)
fillmask = cv2.dilate(fillmask, E(3))
bg_small = cv2.inpaint(small, fillmask, 7, cv2.INPAINT_TELEA)
bg = cv2.GaussianBlur(cv2.resize(bg_small, (w, h), interpolation=cv2.INTER_CUBIC), (0, 0), 6)

# 2) grain that matches the original background so the repaired area does not look "too clean"
resid = (im.astype(np.float32) - cv2.GaussianBlur(im, (0, 0), 3).astype(np.float32))[clean > 0]
sigma = float(resid.std())
rng = np.random.default_rng(7)
bg_noisy = np.clip(bg.astype(np.float32) + rng.normal(0, sigma, bg.shape), 0, 255)

# 3) replace the lettering zone (never the W or the ball, plus a small safety gap around them)
zone = cv2.dilate(text_mask, E(55))
zone = cv2.bitwise_and(zone, cv2.bitwise_not(cv2.dilate(keep_mask, E(17))))
alpha = cv2.GaussianBlur(zone.astype(np.float32) / 255.0, (0, 0), 5)[..., None]
out = (im.astype(np.float32) * (1 - alpha) + bg_noisy * alpha).clip(0, 255).astype(np.uint8)
cv2.imwrite("public/brand/logo-icon-orange-notext.png", out)
print("lettering components removed:", len(text), "| W and ball kept untouched:", len(keep), "| noise sigma:", round(sigma, 2))
