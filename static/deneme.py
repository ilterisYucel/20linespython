def get_line_count(filename):
    try:
        try:
            in_file = open(filename, 'r')
            print(len(in_file.readlines()))
        except IOError:
            print("File is not exist!")
    except TypeError:
        print("File name must be string!")
get_line_count("file0.txt")
get_line_count(12.34)
get_line_count("./data/statements.py")
