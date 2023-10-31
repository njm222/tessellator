import { BufferGeometry, Mesh, Vector3 } from "three";

export function getMeshCenter(mesh: Mesh<BufferGeometry, any> | null) {
  const geometry = mesh?.geometry;
  if (!geometry) return;
  geometry.computeBoundingBox();
  const center = new Vector3();
  if (!geometry.boundingBox) return;
  geometry.boundingBox.getCenter(center);
  mesh.localToWorld(center);
  return center;
}
