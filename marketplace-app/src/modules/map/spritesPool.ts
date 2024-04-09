/**
 * This module optimizes creating tree markers by preallocating a buffer (pool) of sprites. That way, when we have to display a few thousands of markers, we don't have to create all of them in a single tick which is a very expensive operation. Instead, we use the preallocated sprites. It's a technique taken from gamedev - objects pooling.
 */

import { Assets, Container, Sprite, Texture } from 'pixi.js';
import { PIN_SCALE, PIN_TINT } from './const';

const POOL_SIZE = 5_000;

const SPRITES_PER_TICK = 10;

const SPRITES_POOL: Sprite[] = [];

let TEXTURE: Texture | null = null;

export async function loadTexture() {
  TEXTURE = await Assets.load(getDefaultIcon());
}

export async function buildSpritesPool(container: Container) {
  loadTexture();
  while (SPRITES_POOL.length < POOL_SIZE) {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        extendSpritesPool(container);
        resolve();
      });
    });
    await promise;
  }
}

export function getSpriteFromPool(container: Container): Sprite {
  if (!SPRITES_POOL.length) {
    extendSpritesPool(container, 100);
  }
  const sprite = SPRITES_POOL.pop()!;
  return sprite;
}

export function returnSpriteToPool(sprite: Sprite) {
  sprite.scale.set(PIN_SCALE);
  sprite.tint = PIN_TINT;
  SPRITES_POOL.push(sprite);
}

function extendSpritesPool(container: Container, quantity = SPRITES_PER_TICK) {
  for (let i = 0; i < quantity; i++) {
    const sprite = new Sprite(TEXTURE!);
    sprite.anchor.set(0.5, 1);
    sprite.scale.set(PIN_SCALE);
    sprite.cursor = 'crosshair';
    sprite.tint = PIN_TINT;
    sprite.eventMode = 'static';
    container.addChild(sprite);
    SPRITES_POOL.push(sprite);
  }
}

function getDefaultIcon() {
  const svgIcon = `<svg style="-webkit-filter: drop-shadow( 1px 1px 1px rgba(0, 0, 0, .4));filter: drop-shadow( 1px 1px 1px rgba(0, 0, 0, .4));" xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 6.243 6.377 6.903 8 16.398 1.623-9.495 8-10.155 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.342-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>`;
  return getEncodedIcon(svgIcon);
}

function getEncodedIcon(svg: string) {
  const base64 = btoa(svg);
  return `data:image/svg+xml;base64,${base64}`;
}
