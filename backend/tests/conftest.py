import os
import sys
from pathlib import Path

backend_dir = str(Path(__file__).parent.parent)
sys.path.insert(0, backend_dir) 