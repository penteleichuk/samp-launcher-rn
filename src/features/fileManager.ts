import { PACKAGE_NAME } from '@env';
import RNFS, { moveFile } from 'react-native-fs';

// Загрузка файлов
export const FileDownload = {
  download: async (props: DownloadFileType) => {
    const { fromUrl, toFile, toName, progress } = props;

    const toPatch = FilePath.getPathDirCache();

    // Create array folders
    await FilePath.createPathCache(toPatch, toFile);

    // Start download
    return RNFS.downloadFile({
      fromUrl,
      toFile: `${toPatch}/${toFile}/${toName}`,
      progress: progress,
      progressInterval: 800,
    }).promise;
  },
};

// Управление путями
export const FilePath = {
  // Получить путь проводника файлов
  getPathDirCache: () => {
    return `${RNFS.ExternalDirectoryPath}`;
  },

  // Путь распаковки файлов
  getPathDirLauncher: () => {
    return `${RNFS.ExternalDirectoryPath}`;
  },

  // Получить путь настроек
  getPathDirSetting: () => {
    return `/storage/emulated/0/Android/data/${PACKAGE_NAME}/files/SAMP/settings.ini`;
  },

  // Генерация путей
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

  // Создание дерева путей
  createPathCache: async (toPatch: string, toFile: string) => {
    const getPathArray = FilePath.generatePathCache(toFile);

    if (getPathArray.length > 0) {
      for (let i = 0; i < getPathArray.length; i++) {
        // Create dir
        if (!(await RNFS.exists(`${toPatch}/${getPathArray[i]}`))) {
          await RNFS.mkdir(`${toPatch}/${getPathArray[i]}`);
        }
      }
    } else {
      // Create dir
      if (!(await RNFS.exists(`${toPatch}`))) {
        await RNFS.mkdir(`${toPatch}`);
      }
    }
  },
};

// Валидация файлов
export const FileValidate = {
  isValidFileHash: async (localFile: string, validHash: string) => {
    const fileExists = await RNFS.exists(localFile);
    if (fileExists) {
      const fileHash = await RNFS.hash(localFile, 'md5');

      // Файл найден, но не валидный
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
    // Проверка на GPU
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
    // Проверка на GPU
    if (
      gpuCache.length > 0 &&
      gpuCache.split('').some(element => element[0] === gpuSystem[0]) === false
    ) {
      return false;
    }

    return true;
  },
};

// Изменить название файла
export const FileName = {
  // Изменить data.etc на _data.etc и _data.etc на data.etc
  reversFiles: async (path: string, name: string, mode: number) => {
    const toPatch = FilePath.getPathDirCache();
    const filepath = `${toPatch}/${path}/${name}`;
    const destPath = `${toPatch}/${path}/_${name}`;

    let needDownload = [0, 0];
    const reserveFilepath = `${toPatch}/${path}/__${name}`;

    // Исходный файл
    const currentExists = await RNFS.exists(filepath);
    if (!currentExists) {
      needDownload[mode] = 1;
    } else {
      await moveFile(filepath, reserveFilepath);
    }

    // Новый файл
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
  // Переменновать файл
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
  // Скрыть файл _
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
  // Показать файл _
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

// ТИПЫ
type DownloadFileType = {
  fromUrl: string;
  toFile: string;
  toName: string;
  progress: (res: DownloadProgressType) => void;
};

type IsValidCacheType = {
  gpuCache: string; // GPU кеша
  gpuSystem: string; // GPU телефона
  path: string; // Путь файла
  name: string; // Название файла
  bytes: number; // Размер кеша в bytes
  filesContinue: string[]; // Файлы которые нужно пропустить
};

export type DownloadProgressType = {
  jobId: number;
  contentLength: number;
  bytesWritten: number;
};
