import { PACKAGE_NAME } from '@env';
import RNFS, { moveFile } from 'react-native-fs';

export const FileDownload = {
  download: async (props: DownloadFileType) => {
    const { fromUrl, toFile, toName, progress } = props;

    const toPatch = FilePath.getPathDirCache();

    await FilePath.createPathCache(toPatch, toFile);

    return RNFS.downloadFile({
      fromUrl,
      toFile: `${toPatch}/${toFile}/${toName}`,
      progress: progress,
      progressInterval: 800,
    }).promise;
  },
};

export const FilePath = {
  getPathDirCache: () => {
    return `${RNFS.ExternalDirectoryPath}`;
  },

  getPathDirLauncher: () => {
    return `${RNFS.ExternalDirectoryPath}`;
  },

  getPathDirSetting: () => {
    return `/storage/emulated/0/Android/data/${PACKAGE_NAME}/files/SAMP/settings.ini`;
  },

  generatePathCache: (path: string): string[] => {
    if (!path) {
      return [];
    }

    const pathSplit = path.split('/');

    const pathFinally = [];
    let createPath;

    for (const el of pathSplit) {
      createPath = createPath ? `${createPath}/${el}` : `${el}`;
      pathFinally.push(createPath);
    }

    return pathFinally;
  },

  createPathCache: async (toPatch: string, toFile: string) => {
    const getPathArray = FilePath.generatePathCache(toFile);

    if (getPathArray.length > 0) {
      for (let i = 0; i < getPathArray.length; i++) {
        if (!(await RNFS.exists(`${toPatch}/${getPathArray[i]}`))) {
          await RNFS.mkdir(`${toPatch}/${getPathArray[i]}`);
        }
      }
    } else {
      if (!(await RNFS.exists(`${toPatch}`))) {
        await RNFS.mkdir(`${toPatch}`);
      }
    }
  },
};

export const FileValidate = {
  isValidFileHash: async (localFile: string, validHash: string) => {
    const fileExists = await RNFS.exists(localFile);
    if (fileExists) {
      const fileHash = await RNFS.hash(localFile, 'md5');

      return validHash === fileHash;
    }

    return false;
  },
  isValidCache: async ({
    gpuCache,
    gpuSystem,
    path,
    name,
    bytes,
    filesContinue,
  }: IsValidCacheType) => {
    if (
      gpuCache.length > 0 &&
      gpuCache.split('').some(element => element[0] === gpuSystem[0]) === false
    ) {
      return 'continue';
    }

    try {
      const toPatch = FilePath.getPathDirCache();

      const { size } = await RNFS.stat(`${toPatch}/${path}/${name}`);
      if (bytes === size || filesContinue.includes(name)) {
        return 'success';
      }
    } catch (e) {
      return 'download';
    }

    return 'download';
  },
  isValidGpu: async ({
    gpuCache,
    gpuSystem,
  }: {
    gpuCache: string;
    gpuSystem: string;
  }) => {
    if (
      gpuCache.length > 0 &&
      gpuCache.split('').some(element => element[0] === gpuSystem[0]) === false
    ) {
      return false;
    }

    return true;
  },
};

export const FileName = {
  reversFiles: async (path: string, name: string, mode: number) => {
    const toPatch = FilePath.getPathDirCache();
    const filepath = `${toPatch}/${path}/${name}`;
    const destPath = `${toPatch}/${path}/_${name}`;

    let needDownload = [0, 0];
    const reserveFilepath = `${toPatch}/${path}/__${name}`;

    const currentExists = await RNFS.exists(filepath);
    if (!currentExists) {
      needDownload[mode] = 1;
    } else {
      await moveFile(filepath, reserveFilepath);
    }

    const destExists = await RNFS.exists(destPath);
    if (!destExists) {
      needDownload[mode] = 1;
    } else {
      await moveFile(destPath, filepath);
    }

    if (currentExists) {
      await moveFile(reserveFilepath, destPath);
    }

    return needDownload;
  },

  renameFile: async (path: string, name: string, newName: string) => {
    const toPatch = FilePath.getPathDirCache();
    const filepath = `${toPatch}/${path}/${name}`;
    const destPath = `${toPatch}/${path}/${newName}`;

    const fileExists = await RNFS.exists(filepath);
    if (!fileExists) {
      return false;
    }

    try {
      await moveFile(filepath, destPath);
      return true;
    } catch (e) {
      return false;
    }
  },

  hideFile: async (path: string, name: string) => {
    const toPatch = FilePath.getPathDirCache();
    const filepath = `${toPatch}/${path}/${name}`;
    const destPath = `${toPatch}/${path}/_${name}`;

    const fileExists = await RNFS.exists(filepath);
    if (!fileExists) {
      return false;
    }

    try {
      await moveFile(filepath, destPath);
      return true;
    } catch (e) {
      return false;
    }
  },

  showFile: async (path: string, name: string) => {
    const toPatch = FilePath.getPathDirCache();
    const filepath = `${toPatch}/${path}/_${name}`;
    const destPath = `${toPatch}/${path}/${name}`;

    const fileExists = await RNFS.exists(filepath);
    if (!fileExists) {
      return false;
    }

    try {
      await moveFile(filepath, destPath);
      return true;
    } catch (e) {
      return false;
    }
  },
};

type DownloadFileType = {
  fromUrl: string;
  toFile: string;
  toName: string;
  progress: (res: DownloadProgressType) => void;
};

type IsValidCacheType = {
  gpuCache: string;
  gpuSystem: string;
  path: string;
  name: string;
  bytes: number;
  filesContinue: string[];
};

export type DownloadProgressType = {
  jobId: number;
  contentLength: number;
  bytesWritten: number;
};
