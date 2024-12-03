import { parser } from "./sol1";

const reports = parser("input.eg.txt");

const answers = [0, 1, 2, 3, 4, 9, 15, 24, 39, 49, 74, 99, 124, 125, 126, 127, 131, 133, 148, 163, 173, 198, 223, 228, 248, 249, 250, 251, 255, 256, 257, 272, 297, 322, 347, 372, 373, 374, 375, 381, 387, 396, 421, 446, 471, 498, 510, 514, 516, 557, 565, 588, 590, 598, 599, 600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 
    636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711, 712, 713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738, 739, 740, 741, 742, 743, 744, 745, 746, 747, 748, 749, 750, 751, 752, 753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 
    855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 970, 971, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 982, 983, 984, 985, 986, 987, 988, 989, 990, 991, 992, 993, 994, 995, 996, 997, 998, 999]

const checkBadReport = (report: number[]) => {
    const trendScore = report.reduce<number>((acc, num, i, arr) => {
        if (i < arr.length - 1) {
            acc += arr[i + 1] > arr[i] ? 1 : arr[i + 1] < arr[i] ? -1 : 0
        }
        return acc
    }, 0)

    const isDecreasingTrend = trendScore < 0
    const isIncreasingTrend = !isDecreasingTrend

    const isDecreasing = (i: number, j: number) => report[j] < report[i]
    const isIncreasing = (i: number, j: number) => report[j] > report[i]

    const diff = report.length - Math.abs(trendScore)

    if (trendScore === 0 || diff > 3) return false

    let removedIndex = -1
    for (let i = 0; i < report.length - 1; i++) {
        if (isDecreasingTrend) {
            if (!isDecreasing(i, i + 1)) {
                if (removedIndex !== -1) return false

                if (i > 0 ? isDecreasing(i - 1, i + 1) : true) {
                    removedIndex = i
                }
            }
        } else if (isIncreasingTrend) {
            if (!isIncreasing(i, i + 1)) {
                if (removedIndex !== -1) return false

                if (i > 0 ? isIncreasing(i - 1, i + 1) : true) {
                    removedIndex = i
                }
            }
        }
    }
    if (removedIndex !== -1) {
        report.splice(removedIndex, 1)
    }

    // Now the report is stricty increasing or decreasing    
    if((JSON.stringify([...report].sort((a, b) => a - b)) !== JSON.stringify(report)) && (JSON.stringify([...report].sort((a, b) => b - a)) !== JSON.stringify(report))) {
        return false
    }

    for (let i = 0; i < report.length - 1; i++) {
        const checkCondition = (i: number, j: number) => Math.abs(report[i] - report[j]) >= 1 && Math.abs(report[i] - report[j]) <= 3

        if(!checkCondition(i, i + 1)) {
            if(removedIndex !== -1) return false
            // either remove i or i + 1
            if(i > 0 && i < report.length - 1) {
                if(checkCondition(i - 1, i + 1)) removedIndex = i
            } else removedIndex = i
        }
    }

    return true
}

const ans = reports.reduce<number>((ans, report, i) => {
    const originalReport = [...report]
    const isSafeReport = checkBadReport(report)
    // if((!isSafeReport && answers.includes(i)) || (isSafeReport && !answers.includes(i))) {
    //     console.log(report, originalReport, i, isSafeReport)
    // }

    return ans += Number(isSafeReport)
}, 0);

console.log(ans);
console.log(answers.length)