from detector import Detector
files = []

def main():
    for i in range(int(input("Enter number of files "))):
        files.append(input(f"Enter file {i+1} "))
    detector = Detector(files)
    

if __name__ == '__main__':
    main()