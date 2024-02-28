interface ParsedINI {
  [key: string]: string | Record<string, string>;
}

export const parseINIString = (data: string): ParsedINI => {
  const regex = {
    section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
    param: /^\s*([^=]+?)\s*=\s*(.*?)\s*$/,
    comment: /^\s*;.*$/,
  };

  const value: ParsedINI = {};
  let section: string | null = null;

  data.split(/[\r\n]+/).forEach(function (line) {
    if (regex.comment.test(line)) {
      return false;
    } else if (regex.param.test(line)) {
      const match = line.match(regex.param);

      if (match) {
        if (section) {
          if (!value[section]) {
            value[section] = {} as Record<string, string>;
          }
          (value[section] as Record<string, string>)[match[1]] = match[2];
        } else {
          value[match[1]] = match[2];
        }
      }
    } else if (regex.section.test(line)) {
      const match = line.match(regex.section);
      if (match) {
        section = match[1];
        value[section] = {} as Record<string, string>;
      }
    } else if (!line.length && section) {
      section = null;
    }
  });

  return value;
};
