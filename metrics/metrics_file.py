import requests
import sys
import json
from datetime import datetime
import os

now = datetime.now()

base_url = 'https://sonarcloud.io/api/measures/component_tree?component=fga-eps-mds_'
file_name = 'fga-eps-mds-2022-2-PUMA'

metrics = ['files', 'functions', 'complexity', 'comment_lines_density', 'duplicated_lines_density',
           'coverage', 'ncloc', 'tests', 'test_errors', 'test_failures', 'test_execution_time', 'security_rating']


def consumer(repository, version):
    metrics_str = ",".join(metrics)

    res = requests.get(base_url+repository +
                       '&metricKeys='+metrics_str)
    print(res.status_code, res.text)

    m = res.json()

    f = open(
        f'./analytics-raw-data/fga-eps-mds-{repository}-{now.strftime("%m-%d-%Y-%H-%M-%S")}-{version}.json', 'w')
    f.write(json.dumps(m, indent=4))
    f.close()


if __name__ == '__main__':
    folder = 'analytics-raw-data'
    create_folder = os.path.exists(folder)

    if not create_folder:
        os.makedirs(folder)

    repository = sys.argv[1]
    version = sys.argv[2]

    consumer(repository, version)
