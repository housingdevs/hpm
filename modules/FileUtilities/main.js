/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
// import FileUtilities from "..FileUtilities/main";

const GZIPInputStream = Java.type("java.util.zip.GZIPInputStream");
const GZIPOutputStream = Java.type("java.util.zip.GZIPOutputStream");
const FileInputStream = Java.type("java.io.FileInputStream");
const FileOutputStream = Java.type("java.io.FileOutputStream");
const ZipOutputStream = Java.type("java.util.zip.ZipOutputStream")
const ZipEntry = Java.type("java.util.zip.ZipEntry");
const Byte = Java.type("java.lang.Byte");
const PrintStream = Java.type("java.io.PrintStream");
const URL = Java.type("java.net.URL");
const File = Java.type("java.io.File");
const Files = Java.type("java.nio.file.Files");
const Paths = Java.type("java.nio.file.Paths")
const StandardCopyOption = Java.type("java.nio.file.StandardCopyOption");
const JavaArrayList = Java.type("java.util.ArrayList");
const FileTime = Java.type("java.nio.file.attribute.FileTime");
const ByteArrayInputStream = Java.type("java.io.ByteArrayInputStream");
const ByteArrayOutputStream = Java.type("java.io.ByteArrayOutputStream");
const BufferedReader = Java.type("java.io.BufferedReader");
const InputStreamReader = Java.type("java.io.InputStreamReader");
const JavaString = Java.type("java.lang.String");

/**
 * The FileUtilities class has all of the features of the FileUtilities module.
 */
export default class FileUtilities {

  /**
   * Renames the file to the name, the file stays in the same directory.
   * If the destination does not exist new directories will be made.
   * @param {String} target - the filepath of the file to rename
   * @param {String} name - the new name of the file, not including the filepath
   * @returns {Boolean} whether or not the rename was successful
   */

  static renameFile(target, name) {
    const destination = new File(target).getParent() + "/" + name;
    return FileUtilities.moveFile(target, destination);
  }

  /**
   * Moves the target file to the destination.
   * If the destination does not exist new directories will be made.
   * @param {String} target - the filepath of the file to move
   * @param {String} destination - the filepath of the moved file
   * @returns {Boolean} whether or not the move was successful
   */

  static moveFile(target, destination, replace) {
    const f = new File(target);
    const d = new File(destination);
    d.getParentFile().mkdirs();
    return f.renameTo(d);
  }


  /**
   * Renames the directory to the name, the directory stays in the same directory.
   * If the destination does not exist new directories will be made.
   * @param {String} target - the filepath of the directory to rename
   * @param {String} name - the filepath of the renamed directory, not including the filepath
   * @returns {Boolean} whether or not the rename was successful
   */

  static renameDirectory(target, name) {
    const destination = new File(target).getParent() + "/" + name;
    return FileUtilities.moveDirectory(target, destination);
  }


  /**
   * Renames/moves the target directory to the destination.
   * If the destination does not exist new directories will be made.
   * @param {String} target - the filepath of the directory to move
   * @param {String} destination - the filepath of the moved directory
   * @returns {Boolean} whether or not the move was successful
   */

  static moveDirectory(target, destination) {
    const f = new File(target);
    const d = new File(destination);
    d.getParentFile().mkdirs();
    return f.renameTo(d);
  }


  /**
   * Creates a new file at the destination.
   * If the destination does not exist new directories will be made.
   * @param {String} destination - the filepath of the new file
   * @returns {Boolean} whether or not the file was successfully created
   */

  static newFile(destination) {
    const f = new File(destination);
    f.getParentFile().mkdirs();
    f.createNewFile();
  }

  
  /**
   * Creates a new directory at the destination.
   * If the destination does not exist new directories will be made.
   * @param {String} destination - the filepath of the new directory
   * @returns {Boolean} whether or not the directory was successfully created
   */

  static newDirectory(destination) {
    const f = new File(destination);
    return f.mkdirs();
  }


  /**
   * Deletes the target file/directory.
   * @param {String} target - the filepath if the file/directory to delete
   * @returns {Boolean} whether or not the delete was successful
   */

  static delete(target) {
    new Thread(() => {
      if (FileUtilities.isDirectory(target)) {
        FileLib.deleteDirectory(target);
      } else {
        FileLib.delete(target);
      }
    }).start();
    return FileUtilities.exists(target);
  }
  

  /**
   * Deletes the target file/directory when minecraft closes (when the VM terminates).
   * @param {String} target the filepath of the file/directory to delete
   */
  static deleteOnExit(target) {
    const f = new File(target);
    f.deleteOnExit();
  }


  /**
   * Copies a file from the target to the destination.
   * @param {String} target - the filepath of the file to copy
   * @param {String} destination - the filepath to copy it to, including the name of the file
   * @param {Boolean} [replace] - whether or not to repalce existing files (defaults to false)
   * @returns {Boolean} - if the operation succeeds
   */

  static copyFile(target, destination, replace) {
    new Thread(() => {
      try {
        const d = new File(destination);
        d.getParentFile().mkdirs();
        const p = new File(target).toPath();
        const q = new File(destination).toPath();
        if (replace === true) {
          Files.copy(p, q, StandardCopyOption.REPLACE_EXISTING);
        } else {
          Files.copy(p, q);
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    }).start();
  }


  /**
   * Copies a directory, any subdirectories, and any files from the target to the destination.
   * @param {String} target - the filepath of the directory to copy
   * @param {String} destination - the filepath to copy it to, including the name of the directory
   * @param {Boolean} [replace] - whether or not to repalce existing files and directories (defaults to false)
   * @returns {Boolean} - false if the operation fails
   */

  static copyDirectory(target, destination, replace) {
    new Thread(() => {
      try {
        const d = new File(destination);
        d.getParentFile().mkdirs();
        const p = new File(target).toPath();
        const q = new File(destination).toPath();
        Files.walk(p).forEach(file => {
          const f = q.resolve(p.relativize(file));
          if (replace === true) {
            Files.copy(file, f, StandardCopyOption.REPLACE_EXISTING);
          } else {
            Files.copy(file, f);
          }
        });
      } catch(e) {
        console.log(e);
        return false;
      }
    }).start();
  }


  /**
   * Deletes all files and directories in the target directory.
   * @param {String} target - the filepath of the directory to clear
   * @param {Boolean} [onlyFiles] - whether or not to leave directories (default to false)
   */

  static clearDirectory(target, onlyFiles) {
    new Thread(() => {
      const f = new File(target)
      f.listFiles().forEach(file => {
        if (file.isDirectory()) {
          if (onlyFiles) {
            FileUtilities.clearDirectory(file, true)
          } else {
            FileUtilities.delete(file);
          }
        } else {
          file.delete();
        }
      });
    }).start();
  }


  /**
   * Zips a folder recursively to filepath.zip.
   * @param {String} target - the filepath of the file to zip
   */
  
  static ZIP(target) {
    new Thread(() => {
      const destination = file.getAbsolutePath() + ".zip";
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const fileList = FileUtilities.listFilesRecursive(target);
      const FileOS = new FileOutputStream(destination);
      const ZIPOS = new ZipOutputStream(FileOS);
      fileList.forEach(strfile => {
        const file = new File(strfile)
        const filePath = file.getCanonicalPath();
        const lengthDirectoryPath = new File(target).getCanonicalPath().length;
        const lengthFilePath = filePath.length;
        const zipFilePath = filePath.substring(lengthDirectoryPath + 1, lengthFilePath);
        ZIPOS.putNextEntry(new ZipEntry(zipFilePath));
        const FileIS = new FileInputStream(file);
        let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
        let len;
        while ((len = FileIS.read(buf)) > 0) {
          ZIPOS.write(buf, 0, len);
        }
        ZIPOS.closeEntry();
      });
      ZIPOS.close();
    }).start();
  }
  

  /**
   * Gzips a file to filepath.gz.
   * @param {String} target - the filepath of the file to gzip
   */

  static GZIP(target) {
    new Thread(() => {
      const destination = target + ".gz"
      const FileIS = new FileInputStream(target);
      const FilePS = new PrintStream(destination);
      const GZIPOS = new GZIPOutputStream(FilePS);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = FileIS.read(buf)) > 0) {
        GZIPOS.write(buf, 0, len);
      }
      FileIS.close();
      GZIPOS.close();
      FilePS.close();
    }).start();
  }


  /**
   * Gzips a string
   * @param {String} string - the string to compress
   * @returns {String} the compressed string
   */
  static GZIPString(string) {
    const StringOS = new ByteArrayOutputStream();
    const GZIPOS = new GZIPOutputStream(StringOS);
    GZIPOS.write(new JavaString(string).getBytes());
    let outString = StringOS.toString();
    GZIPOS.close();
    StringOS.close();
    return outString;
  }


  /**
   * Extracts a gzipped file.
   * @param {String} target - the filepath of the gzipped file
   * @param {String} [destination] - the filepath to extract the file to (by deafult it will remove the last extension (usually .gz))
   * @returns {String} the ungzipped data that has been written to the file
   */

  static unGZIP(target, destination) {
    new Thread(() => {
      const d = (destination !== undefined) ? new File(destination) : new File(target.split(".").pop().join(""));
      d.getParentFile().mkdirs();
      const FileIS = new FileInputStream(target);
      const FilePS = new PrintStream(destination);
      const GZIPIS = new GZIPInputStream(FileIS);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len
      while ((len = GZIPIS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
      }
      GZIPIS.close();
      FileIS.close();
      FilePS.close();
    }).start();
    return FileLib.read(destination);
  }


  /**
   * Decompresses a gzipped string
   * @param {String} string - the string to decompress
   * @returns {String} the ungzipped string
   */
  static unGZIPString(string) {
    const StringIS = new ByteArrayInputStream(new JavaString(string).getBytes());
    const GZIPIS = new GZIPInputStream(StringIS);
    const ISReader = new InputStreamReader(GZIPIS);
    const BReader = new BufferedReader(ISReader);
    let outString = "";
    let line;
    GZIPIS.close();
    StringIS.close();
    while ((line = BReader.readLine()) !== null) {
      outString += line;
    }
    return outString;
  }


  /**
   * Gets gzipped data from a url and decodes it to the destination.
   * @param {String} url - the url to get the gzipped data from
   * @param {String} destination - the filepath to write the data to
   * @param {Number} connecttimeout - the connect timeout of the connection in ms
   * @param {Number} readtimeout - the read timeout of the connection in ms
   * @returns {String} the ungzipped data written to the file
   */
  
  static unGZIPURL(url, destination, connecttimeout, readtimeout) {
    new Thread(() => {
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const connection = new URL(url).openConnection();
      connection.setDoOutput(true);
      connection.setConnectTimeout(connecttimeout);
      connection.setReadTimeout(readtimeout);
      const GZIPIS = new GZIPInputStream(connection.getInputStream());
      const FilePS = new PrintStream(destination);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = GZIPIS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
      }
      GZIPIS.close();
      FilePS.close();
    }).start();
    return FileLib.read(destination);
  }

  /**
   * Gets  data from a url and writes it to the destination.
   * @param {String} url - the url to get the  data from
   * @param {String} destination - the filepath to write the data to
   * @param {Number} connecttimeout - the connect timeout of the connection in ms
   * @param {Number} readtimeout - the read timeout of the connection in ms
   * @returns {String} the data written to the file
   */

  static urlToFile(url, destination, connecttimeout, readtimeout) {
    new Thread(() => {
      const d = new File(destination);
      d.getParentFile().mkdirs();
      const connection = new URL(url).openConnection();
      connection.setDoOutput(true);
      connection.setConnectTimeout(connecttimeout);
      connection.setReadTimeout(readtimeout);
      const IS = connection.getInputStream();
      const FilePS = new PrintStream(destination);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = IS.read(buf)) > 0) {
        FilePS.write(buf, 0, len);
      }
      IS.close();
      FilePS.close();
    }).start();
    return FileLib.read(destination);
  }


  /**
   * Returns an array of files, and files in subdirectories, within a directory.
   * @param {String} target - the filepath of the directory to recursively list the files from
   * @returns {(String[] | Boolean)} an array of files in the target directory and its subdirectories, or false if the target is not a directory
   */

  static listFilesRecursive(target) {
    const f = new File(target);
    if (!f.isDirectory()) return false;
    let r = [];
    f.listFiles().forEach(file => {
      if (file.isDirectory()) {
        r = r.concat(FileUtilities.listFilesRecursive(file));
      } else {
        r.push(file.getAbsolutePath());
      }
    });
    return r;
  }


  /**
   * Returns an array of files within a directory.
   * @param {String} target - the filepath of the file to list the files from
   * @returns {(String[] | Boolean)} an array of files in the target directory, or false if the target is not a directory
   */

  static listFiles(target) {
    const f = new File(target);
    if (!f.isDirectory()) return false;
    const r = [];
    f.listFiles().forEach(file => {
      if (file.isFile()) {
        r.push(file.getAbsolutePath());
      }
    });
    return r;
  }


  /**
   * Returns an array of subdirectories within a directory.
   * @param {String} target - the filepath to list the directories from
   * @returns {(String[] | Boolean)} an array of directories in the target directory, or false if the target is not a directory
   */

  static listDirectories(target) {
    const f = new File(target);
    if (!f.isDirectory()) return false;
    const r = [];
    f.listFiles().forEach(file => {
      if (file.isDirectory()) {
        r.push(file.getAbsolutePath());
      }
    });
    return r;
  }


  /**
   * Returns an array of files and subdirectories within a directory.
   * @param {String} target - the filepath to list the file and directories from
   * @returns {(String[] | Boolean)} an array of files and directories in the target directory, or false if the target is not a directory
   */

  static listFilesAndDirectories(target) {
    const f = new File(target);
    if (!f.isDirectory()) return false;
    const r = [];
    f.listFiles().forEach(file => {
      r.push(file.getAbsolutePath());
    });
    return r;
  }


  /**
   * Checks if the target file exists.
   * @param {String} target - the filepath to check
   * @returns {Boolean} whether or not the file exists
   */

  static exists(target) {
    const f = new File(target);
    return f.exists();
  }


  /**
   * Checks if the target is a directory.
   * @param {String} target - the filepath to check
   * @returns {Boolean} whether or not the file is a directory
   */

  static isDirectory(target) {
    const f = new File(target);
    return f.isDirectory();
  }


  /**
   * Checks if the target is a file.
   * @param {String} target - the filepath to check
   * @returns {Boolean} whether or not the file is a file
   */

  static isFile(target) {
    const f = new File(target);
    return f.isFile();
  }

  /**
   * Checks if the target is hidden.
   * @param {String} target - the filepath to check
   * @returns {Boolean} whether or not the file is hidden
   */
  static isHidden(target) {
    const f = new File(target)
    return f.isHidden();
  }


  /**
   * Tests if the file is writeable.
   * @param {String} target - the filepath of the file to test
   * @returns {Boolean} whether or not the file is writeable
   */
  static canWrite(target) {
    const f = new File(target);
    return f.canWrite();
  }


  /**
   * Sets a file's write permission for the owner or everbody.
   * @param {String} target - the filepath of the file to set writeable
   * @param {Boolean} writeable - whether to set it writeable or not
   * @param {Boolean} [ownerOnly] - owner's permission or everyone's permission (defaults to false)
   * @returns {Boolean} whether or not the operation suceeds
   */
  static setWriteable(target, writeable, ownerOnly) {
    const f = new File(target);
    let ownerOnly = ownerOnly ?? false;
    return f.setWritable(writeable, ownerOnly);
  }


  /**
   * Tests if the file is readable.
   * @param {String} target - the filepath of the file to test
   * @returns {Boolean} whether or not the file is readable
   */
  static canRead(target) {
    const f = new File(target);
    return f.canRead();
  }


  /**
   * Sets a file's read permission for the owner or everbody.
   * @param {String} target - the filepath of the file to set readable
   * @param {Boolean} readable - whether to set it readable or not
   * @param {Boolean} [ownerOnly] - owner's permission or everyone's permission (defaults to false)
   * @returns {Boolean} whether or not the operation suceeds
   */
  static setReadable(target, readable, ownerOnly) {
    const f = new File(target);
    let ownerOnly = ownerOnly ?? false;
    return f.setReadable(readable, ownerOnly);
  }


  /**
   * Tests if the file is executable.
   * @param {String} target - the filepath of the file to test
   * @returns {Boolean} whether or not the file is executable
   */
  static canExcecute(target) {
    const f = new File(target);
    return f.canExecute();
  }


  /**
   * Sets a file's execute permission for the owner or everbody.
   * @param {String} target - the filepath of the file to set executable
   * @param {Boolean} executable - whether to set it executable or not
   * @param {Boolean} [ownerOnly] - owner's permission or everyone's permission (defaults to false)
   * @returns {Boolean} whether or not the operation suceeds
   */
  static setExecutable(target, executable, ownerOnly) {
    const f = new File(target);
    let ownerOnly = ownerOnly ?? false;
    return f.setExecutable(executable, ownerOnly);
  }
  
  
  /**
   * Returns a map of the BasicFileAttributes. See https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/BasicFileAttributes.html for a list of the keys and what objects are returned.
   * @param {String} target - the file to get the attributes from
   * @returns {Map<String, Object>} a map of the file attributes, the key is the attribute name and the value is the attribute value
   */
   
  static getFileAttributes(target) {
    const f = Paths.get(target);
    return Files.readAttributes(f, "*");
  }


  /**
   * Sets the BasicFileAttributes. See https://docs.oracle.com/javase/8/docs/api/java/nio/file/attribute/BasicFileAttributes.html for a list of the attributes and objects their values are.
   * @param {String} target - the filepath of the file to set an attribute of
   * @param {String} attribute - the attribute name in camelCase
   * @param value - the value to set the attributes
   */
  static setFileAttributes(target, attribute, value) {
    const f = Paths.get(target);
    const attr = "basic:" + attribute;
    Files.setAttribute(f, attr, value);
  }
  

  /**
   * Returns the size of a file in bytes
   * @param {String} target - the filepath of the file to get the size of
   * @returns {Number} the size of the file in bytes
   */

  static getFileSize(target) {
    const f = Paths.get(target);
    return Files.size(f);
  }

  /**
   * Checks if a file is a symbolic link.
   * @param {String} target - the filepath of the file to check
   * @returns {Boolean} whether or not the file is a symbolic link
   */
  static isSymbolicLink(target) {
    const attr = FileUtilities.getFileAttributes(target);
    return attr.get("isSymbolicLink");
  }

  
  /**
   * Returns the time the file or directory was last modified.
   * @param {String} target - the filepath of the file to get the time from
   * @returns {Date} a date object of the time the file or directory was last modified
   */
  
  static getLastModifiedTime(target) {
    const attr = FileUtilities.getFileAttributes(target);
    const t = attr.get("lastModifiedTime");
    return new Date(t.toMillis());
  }


  /**
   * Sets a file's last modified time.
   * @param {String} target - the filepath of the file to set the time
   * @param {Number} time the time to set last modified (number of milliseconds since UNIX epoch)
   */
  static setLastModifiedTime(target, time) {
    const f = Paths.get(target);
    const t = FileTime.fromMillis(time);
    Files.setAttribute(f, "basic:lastModifiedTime", t);
  }
  
  /**
   * Returns the time the file or directory was last accessed.
   * @param {String} target - the filepath of the file to get the time from
   * @returns {Date} a date object of the time the file or directory was last accessed
   */
  
  static getLastAccessTime(target) {
    const attr = FileUtilities.getFileAttributes(target);
    const t = attr.get("lastAccessTime");
    return new Date(t.toMillis());
  }


  /**
   * Sets a file's last accessed time.
   * @param {String} target - the filepath of the file to set the time
   * @param {Number} time the time to set last accessed (number of milliseconds since UNIX epoch)
   */
  static setLastAccessTime(target, time) {
    const f = Paths.get(target);
    const t = FileTime.fromMillis(time);
    Files.setAttribute(f, "basic:lastAcessTime", t);
  }
  
  
  /**
   * Returns the time the file or directory was created.
   * @param {String} target - the filepath of the file to get the time from
   * @returns {Date} a date object of the time the file or directory was created
   */
  
  static getCreationTime(target) {
    const attr = FileUtilities.getFileAttributes(target);
    const t = attr.get("creationTime");
    return new Date(t.toMillis());
  }

  /**
   * Sets a file's creation time.
   * @param {String} target - the filepath of the file to set the time
   * @param {Number} time the time to set creation (number of milliseconds since UNIX epoch)
   */
  static setCreatiomTime(target, time) {
    const f = Paths.get(target);
    const t = FileTime.fromMillis(time);
    Files.setAttribute(f, "basic:creationTime", t);
  }

  /**
   * Gets the folder that a file is in.
   * @param {String} target - the filepath of the file to get the parent folder of
   * @param {Boolean} [path] - whether to return the name (false) or full path (true) (defaults to false)
   * @returns {String} the name of the parent folder
   */

  static getParentFolder(target, path) {
    const parent = new File(new File(target).getParent())
    if (path) return parent.getAbsolutePath();
    return parent.getName();
  }

  /**
   * Gets the extension of a file.
   * @param {String} target - the filepath of the file to get the extension of
   * @returns {String} the file extension, e.g., "txt"
   */

  static getExtension(target) {
    return target.split(".").pop();
  }
}




export function unGZIP(target, destination) {
  new Thread(() => {
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let FileIS = new FileInputStream(target);
    let FilePS = new PrintStream(destination);
    let GZIPIS = new GZIPInputStream(FileIS);
    let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
    let len
    while ((len = GZIPIS.read(buf)) > 0) {
      FilePS.write(buf, 0, len);
    }
    GZIPIS.close();
    FileIS.close();
    FilePS.close();
  }).start();
}
  
export function GZIP(target) {
  new Thread(() => {
    let destination = target + ".gz"
    let FileIS = new FileInputStream(target);
    let FilePS = new PrintStream(destination);
    let GZIPOS = new GZIPOutputStream(FilePS);
    let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
    let len;
    while ((len = FileIS.read(buf)) > 0) {
      GZIPOS.write(buf, 0, len);
    }
    FileIS.close();
    GZIPOS.close();
    FilePS.close();
  }).start();
}
  
export function unGZIPURL(url, destination, connecttimeout, readtimeout) {
  new Thread(() => {
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let connection = new URL(url).openConnection();
    connection.setDoOutput(true);
    connection.setConnectTimeout(connecttimeout);
    connection.setReadTimeout(readtimeout);
    let GZIPIS = new GZIPInputStream(connection.getInputStream());
    let FilePS = new PrintStream(destination);
    let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
    let len;
    while ((len = GZIPIS.read(buf)) > 0) {
      FilePS.write(buf, 0, len);
    }
    GZIPIS.close();
    FilePS.close();
    }).start();
}

export function renameFile(target, destination) {
  new Thread(() => {
    let f = new File(target);
    let d = new File(destination);
    d.getParentFile().mkdirs();
    f.renameTo(d);
  }).start();
}

export function renameDirectory(target, destination) {
  new Thread(() => {
    let f = new File(target);
    let d = new File(destination);
    d.getParentFile().mkdirs();
    f.renameTo(d);
  }).start();
}

export function newFile(destination) {
  new Thread(() => {
    let f = new File(destination);
    f.getParentFile().mkdirs();
    f.createNewFile();
  }).start();
}

export function newDirectory(destination) {
  new Thread(() => {
    let f = new File(destination);
    f.mkdirs();
  }).start();
}

export function deleteFile(target) {
  new Thread(() => {
    let f = new File(target);
    f.delete();
  }).start();
}

export function copyFile(target, destination) {
  new Thread(() => {
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let p = Paths.get(target);
    let q = Paths.get(destination);
    Files.copy(p, q, StandardCopyOption.REPLACE_EXISTING);
  }).start();
}

export function copyDirectory(target, destination) {
  new Thread(() => {
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let p = Paths.get(target);
    let q = Paths.get(destination);
    Files.walk(p).forEach(file => {
      let r = q.resolve(p.relativize(file));
      Files.copy(file, r, StandardCopyOption.REPLACE_EXISTING);
    });
  }).start();
}

export function ZIP(target) {
  new Thread(() => {
    let destination = target + ".zip"
    let d = new File(destination);
    d.getParentFile().mkdirs();
    let fileList = new JavaArrayList();
    fileList = listFiles(fileList, target);
    let FileOS = new FileOutputStream(destination);
    let ZIPOS = new ZipOutputStream(FileOS);
    fileList.forEach(file => {
      let filePath = file.getCanonicalPath();
      let lengthDirectoryPath = new File(target).getCanonicalPath().length;
      let lengthFilePath = filePath.length;
      let zipFilePath = filePath.substring(lengthDirectoryPath + 1, lengthFilePath);
      ZIPOS.putNextEntry(new ZipEntry(zipFilePath));
      let FileIS = new FileInputStream(file);
      let buf = new Packages.java.lang.reflect.Array.newInstance(Byte.TYPE, 65536);
      let len;
      while ((len = FileIS.read(buf)) > 0) {
        ZIPOS.write(buf, 0, len);
      }
      ZIPOS.closeEntry();
    });
    ZIPOS.close();
  }).start();
}

function listFiles(list, target) {
  new File(target).listFiles().forEach(file => {
    if (file.isDirectory()) {
      listFiles(list, file);
    } else {
      list.add(file);
    }
  });
  return list;
}